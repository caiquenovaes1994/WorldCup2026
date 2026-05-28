$flags = @('mx','za','kr','cz','ca','ba','qa','ch','br','ma','ht','gb-sct','us','py','au','tr','de','cw','ci','ec','nl','jp','se','tn','be','eg','ir','nz','es','cv','sa','uy','fr','sn','iq','no','ar','dz','at','jo','pt','cd','uz','co','gb-eng','hr','gh','pa')

foreach($f in $flags) {
    $url = "https://flagcdn.com/$f.svg"
    $out = "public/flags/$f.svg"
    Write-Host "Downloading $f..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing
    } catch {
        Write-Host "Failed: $f - $_"
    }
}

Write-Host "Done! Downloaded $($flags.Count) flags."
