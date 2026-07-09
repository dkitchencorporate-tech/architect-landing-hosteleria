$urls = @(
    "https://hosteleria.architectsys.com/admin/scout",
    "https://hosteleria.architectsys.com/admin-architect/pipeline",
    "https://hosteleria.architectsys.com/",
    "https://hosteleria.architectsys.com/hub",
    "https://hosteleria.architectsys.com/demo/carta",
    "https://hosteleria.architectsys.com/deal/demo",
    "https://hosteleria.architectsys.com/onboarding",
    "https://hosteleria.architectsys.com/auth/register",
    "https://hosteleria.architectsys.com/auth/login",
    "https://hosteleria.architectsys.com/dashboard",
    "https://hosteleria.architectsys.com/dashboard/settings",
    "https://hosteleria.architectsys.com/admin-architect/overview",
    "https://hosteleria.architectsys.com/admin-architect/clients",
    "https://hosteleria.architectsys.com/admin-architect/creative",
    "https://hosteleria.architectsys.com/admin-architect/protocols",
    "https://hosteleria.architectsys.com/admin-architect/events-master",
    "https://hosteleria.architectsys.com/manuals",
    "https://hosteleria.architectsys.com/manuals/agente-ia",
    "https://hosteleria.architectsys.com/manuals/centro-control",
    "https://hosteleria.architectsys.com/manuals/estrategia-ventas",
    "https://hosteleria.architectsys.com/manuals/onboarding-b2b"
)

foreach ($u in $urls) {
    Write-Host "Abriendo en PRODUCCION (Vercel): $u" -ForegroundColor Green
    Start-Process $u
    Start-Sleep -Milliseconds 800
}
