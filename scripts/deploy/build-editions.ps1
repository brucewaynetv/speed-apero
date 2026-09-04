# Build 3 éditions client indépendantes (standalone)
# Usage: npm run build:editions
# Sortie: dist/editions/{starter,pro,premium}/ + archives .tgz

param()

$ErrorActionPreference = "Stop"
$Root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$OutRoot = Join-Path $Root "dist\editions"
$Editions = @("starter", "pro", "premium")

New-Item -ItemType Directory -Force -Path $OutRoot | Out-Null

function Build-Edition([string]$Edition) {
  Write-Host ""
  Write-Host "==> Building edition: $Edition" -ForegroundColor Cyan
  Push-Location $Root

  $env:NEXT_TELEMETRY_DISABLED = "1"
  $env:NEXT_PUBLIC_APP_MODE = "client"
  $env:NEXT_PUBLIC_PRODUCT_EDITION = $Edition

  npm run build
  if ($LASTEXITCODE -ne 0) { Pop-Location; throw "build failed for $Edition" }

  $Standalone = Join-Path $Root ".next\standalone"
  $StaticSrc = Join-Path $Root ".next\static"
  $PublicSrc = Join-Path $Root "public"
  $Dest = Join-Path $OutRoot $Edition

  if (Test-Path -LiteralPath $Dest) {
    Remove-Item -Recurse -Force $Dest
  }
  New-Item -ItemType Directory -Force -Path $Dest | Out-Null

  Copy-Item -Recurse -Force "$Standalone\*" $Dest

  $StaticDest = Join-Path $Dest ".next\static"
  New-Item -ItemType Directory -Force -Path $StaticDest | Out-Null
  Copy-Item -Recurse -Force "$StaticSrc\*" $StaticDest

  if (Test-Path -LiteralPath $PublicSrc) {
    $PublicDest = Join-Path $Dest "public"
    New-Item -ItemType Directory -Force -Path $PublicDest | Out-Null
    Copy-Item -Recurse -Force "$PublicSrc\*" $PublicDest
  }

  Copy-Item -Force (Join-Path $Root "ecosystem.config.cjs") $Dest
  Copy-Item -Force (Join-Path $Root "editions\$Edition.env.example") (Join-Path $Dest ".env.example")
  Copy-Item -Force (Join-Path $Root "editions\INSTALL.md") (Join-Path $Dest "INSTALL.md")

  @"
# Speed Apéro — édition $Edition
NEXT_PUBLIC_APP_MODE=client
NEXT_PUBLIC_PRODUCT_EDITION=$Edition
PORT=3010
HOSTNAME=0.0.0.0
"@ | Set-Content -Encoding utf8 (Join-Path $Dest "EDITION.txt")

  $Tar = Join-Path $OutRoot "speed-apero-$Edition.tgz"
  if (Test-Path -LiteralPath $Tar) { Remove-Item -Force $Tar }
  Push-Location $Dest
  & tar.exe -czf $Tar .
  if ($LASTEXITCODE -ne 0) { Pop-Location; Pop-Location; throw "tar failed for $Edition" }
  Pop-Location
  Pop-Location

  $Mb = [math]::Round((Get-Item $Tar).Length / 1MB, 1)
  Write-Host "OK $Edition → $Dest + $Tar ($Mb MB)" -ForegroundColor Green
}

foreach ($e in $Editions) {
  Build-Edition $e
}

# Nettoyage env process
Remove-Item Env:NEXT_PUBLIC_APP_MODE -ErrorAction SilentlyContinue
Remove-Item Env:NEXT_PUBLIC_PRODUCT_EDITION -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "3 éditions prêtes dans dist/editions/" -ForegroundColor Green
Get-ChildItem $OutRoot | Format-Table Name, Length, LastWriteTime
