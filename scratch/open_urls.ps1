$urls = @(
    "http://localhost:3000/admin/scout",
    "http://localhost:3000/admin-architect/pipeline",
    "http://localhost:3000/",
    "http://localhost:3000/hub",
    "http://localhost:3000/demo/carta",
    "http://localhost:3000/deal/demo",
    "http://localhost:3000/onboarding",
    "http://localhost:3000/auth/register",
    "http://localhost:3000/auth/login",
    "http://localhost:3000/dashboard",
    "http://localhost:3000/dashboard/settings",
    "http://localhost:3000/admin-architect/overview",
    "http://localhost:3000/admin-architect/clients",
    "http://localhost:3000/admin-architect/creative",
    "http://localhost:3000/admin-architect/protocols",
    "http://localhost:3000/admin-architect/events-master",
    "http://localhost:3000/manuals",
    "http://localhost:3000/manuals/agente-ia",
    "http://localhost:3000/manuals/centro-control",
    "http://localhost:3000/manuals/estrategia-ventas",
    "http://localhost:3000/manuals/onboarding-b2b"
)

foreach ($u in $urls) {
    Write-Host "Abriendo en navegador: $u" -ForegroundColor Cyan
    Start-Process $u
    Start-Sleep -Milliseconds 800
}
