$profileName = "iot-button"
$functionName = "arn:aws:lambda:us-east-1:431854676248:function:ThingsIveDone"
$region = "us-east-1"
$currentDir = (Get-Item -Path '.\' -Verbose).FullName
$zipSource = "$currentDir\source"
$zipfileName = "$currentDir\source.zip"

function Create-Zip( $zipfilename, $sourcedir )
{
	If(Test-path $zipfilename) {Remove-item $zipfilename}
   Add-Type -Assembly System.IO.Compression.FileSystem
   [System.IO.Compression.ZipFile]::CreateFromDirectory($sourcedir,
        $zipfilename)
}
Write-Host "Zipping up $zipSource"
Create-Zip $zipFileName $zipSource
Write-Host "Zipped up $zipSource"
Update-LMFunctionCode -ProfileName $profileName -FunctionName $functionName -FunctionZip $zipfileName -Region $region


