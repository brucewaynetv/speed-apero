# Deploy Speed Apéro to OVH VPS legeekshop
# Usage: npm run deploy:vps

param()

$ErrorActionPreference = "Stop"
$Root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$Key = if ($env:LGK_VPS_KEY) { $env:LGK_VPS_KEY } else { Join-Path $env:USERPROFILE ".ssh\legeekshop_vps" }
$HostName = if ($env:LGK_VPS_HOST) { $env:LGK_VPS_HOST } else { "152.228.237.29" }
$User = if ($env:LGK_VPS_USER) { $env:LGK_VPS_USER } else { "ubuntu" }
$Remote = "${User}@${HostName}"
$SshBase = @("-i", $Key, "-o", "BatchMode=yes", "-o", "StrictHostKeyChecking=accept-new")

if (-not (Test-Path -LiteralPath $Key)) {
  throw "SSH key missing: $Key"
}

function Invoke-Remote([string]$Cmd) {
  & ssh.exe @SshBase $Remote $Cmd
  if ($LASTEXITCODE -ne 0) { throw "SSH remote command failed ($LASTEXITCODE)" }
}

Write-Host "==> Build production (standalone)"
Push-Location $Root
$env:NEXT_TELEMETRY_DISABLED = "1"
npm run build
if ($LASTEXITCODE -ne 0) { Pop-Location; throw "build failed" }

$Standalone = Join-Path $Root ".next\standalone"
$StaticSrc = Join-Path $Root ".next\static"
$PublicSrc = Join-Path $Root "public"
$ServerJs = Join-Path $Standalone "server.js"
if (-not (Test-Path -LiteralPath $ServerJs)) {
  Pop-Location
  throw "standalone server.js missing - check next.config output standalone"
}

$StaticDest = Join-Path $Standalone ".next\static"
New-Item -ItemType Directory -Force -Path $StaticDest | Out-Null
Copy-Item -Recurse -Force "$StaticSrc\*" $StaticDest
if (Test-Path -LiteralPath $PublicSrc) {
  $PublicDest = Join-Path $Standalone "public"
  New-Item -ItemType Directory -Force -Path $PublicDest | Out-Null
  Copy-Item -Recurse -Force "$PublicSrc\*" $PublicDest
}

Copy-Item -Force (Join-Path $Root "ecosystem.config.cjs") $Standalone
$DeployDir = Join-Path $Standalone "deploy"
New-Item -ItemType Directory -Force -Path $DeployDir | Out-Null
Copy-Item -Force (Join-Path $Root "deploy\nginx-speed-apero.conf") $DeployDir

$EnvFile = Join-Path $Root ".env"
if (Test-Path -LiteralPath $EnvFile) {
  Copy-Item -Force $EnvFile (Join-Path $Standalone ".env.deploy")
} else {
  Write-Warning "No local .env - ensure /opt/speed-apero/.env exists on VPS"
}

Write-Host "==> Pack standalone"
$DeployToken = "${PID}-$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())"
$Tar = Join-Path $env:TEMP "speed-apero-deploy-${DeployToken}.tgz"
$RemoteTar = "/tmp/speed-apero-deploy-${DeployToken}.tgz"

Push-Location $Standalone
& tar.exe -czf $Tar .
if ($LASTEXITCODE -ne 0) { Pop-Location; Pop-Location; throw "tar failed" }
Pop-Location
Pop-Location

$SizeMb = [math]::Round((Get-Item $Tar).Length / 1MB, 1)
Write-Host "Packed $Tar ($SizeMb MB)"

try {
  Write-Host "==> Upload"
  & scp.exe @SshBase $Tar "${Remote}:${RemoteTar}"
  if ($LASTEXITCODE -ne 0) { throw "scp archive failed" }
  & scp.exe @SshBase (Join-Path $Root "scripts\deploy\remote-speed-apero-up.sh") "${Remote}:/tmp/"
  if ($LASTEXITCODE -ne 0) { throw "scp helper failed" }

  Write-Host "==> Remote install"
  Invoke-Remote "sed -i 's/\r`$//' /tmp/remote-speed-apero-up.sh; bash /tmp/remote-speed-apero-up.sh '$RemoteTar'"

  Write-Host "DEPLOY_OK - app on VPS port 3010"
  Write-Host "DNS: point A speed-apero -> $HostName then run certbot"
}
finally {
  if (Test-Path -LiteralPath $Tar) {
    Remove-Item -LiteralPath $Tar -Force -ErrorAction SilentlyContinue
  }
}
