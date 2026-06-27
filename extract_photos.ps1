# PowerShell script to extract photos.zip into public/images

$ZipName = "photos.zip"
$TargetDir = Join-Path $PSScriptRoot "public/images"

# Create target directory if it doesn't exist
if (!(Test-Path $TargetDir)) {
    New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
}

$ZipPath = Join-Path $PSScriptRoot $ZipName

if (!(Test-Path $ZipPath)) {
    # Check Downloads folder as a backup
    $DownloadsZip = "C:\Users\harin\Downloads\photos.zip"
    if (Test-Path $DownloadsZip) {
        Write-Host "Found photos.zip in Downloads. Copying to project root..." -ForegroundColor Cyan
        Copy-Item -Path $DownloadsZip -Destination $ZipPath -Force
    } else {
        Write-Host "--------------------------------------------------------" -ForegroundColor Yellow
        Write-Host "Error: photos.zip not found in project root or Downloads." -ForegroundColor Red
        Write-Host "Please place your photos ZIP file in this folder:" -ForegroundColor Yellow
        Write-Host "  $PSScriptRoot" -ForegroundColor White
        Write-Host "And rename it to: photos.zip" -ForegroundColor White
        Write-Host "Then re-run this script." -ForegroundColor Yellow
        Write-Host "--------------------------------------------------------" -ForegroundColor Yellow
        Exit
    }
}

Write-Host "Extracting photos.zip to $TargetDir..." -ForegroundColor Cyan
try {
    Expand-Archive -Path $ZipPath -DestinationPath $TargetDir -Force
    Write-Host "Photos extracted successfully! You can find them under public/images." -ForegroundColor Green
} catch {
    Write-Host "Error extracting zip file: $_" -ForegroundColor Red
}
