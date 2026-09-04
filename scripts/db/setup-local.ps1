# Attend que Postgres Docker soit healthy puis push + seed
$ErrorActionPreference = "Stop"
Set-Location (Resolve-Path (Join-Path $PSScriptRoot "..\.."))

Write-Host "==> Starting Postgres (Docker)"
docker compose up -d postgres
if ($LASTEXITCODE -ne 0) { throw "docker compose failed" }

$ready = $false
for ($i = 1; $i -le 30; $i++) {
  $status = docker inspect --format="{{.State.Health.Status}}" speed-apero-db 2>$null
  Write-Host "  health check $i/30 → $status"
  if ($status -eq "healthy") { $ready = $true; break }
  Start-Sleep -Seconds 2
}
if (-not $ready) { throw "Postgres not healthy in time" }

Write-Host "==> prisma db push"
npx prisma db push
if ($LASTEXITCODE -ne 0) { throw "prisma db push failed" }

Write-Host "==> seed"
npm run db:seed
if ($LASTEXITCODE -ne 0) { throw "seed failed" }

Write-Host "OK — BDD locale prête (localhost:5433 / speedapero)" -ForegroundColor Green
Write-Host "Admin: admin@speedapero.demo / demo2026"
