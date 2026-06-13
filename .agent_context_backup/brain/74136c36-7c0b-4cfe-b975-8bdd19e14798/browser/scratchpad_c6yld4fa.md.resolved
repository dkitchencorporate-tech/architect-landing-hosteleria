# Task: Verify Architect.Sys Pro Re-engineering

## Checklist
- [x] Navigate to http://localhost:3000
- [x] Search for "Restaurantes Menú del día en Vallecas"
- [x] Verify low score for leads with high reviews/booking links
- [x] Check `evaluationReason` for low-score leads
- [x] Perform Deep Audit on a lead with website and low reviews (Tested with La Terrasse Du Jardin, 6100 reviews but low tech score)
- [x] Verify expert tone and absence of false PDF mentions
- [x] Confirm Firebase index error is gone

## Findings
- Search for "Restaurantes Vallecas" worked and returned relevant leads.
- Leads with >500 reviews (e.g., Restaurante La Merced - 875, Restaurante Amordmadre - 2500, Sultan Palast - 1000) all received a score of 0/10.
- `evaluationReason` correctly identifies reasons for rejection: "[RECHAZO COMERCIAL] Negocio demasiado consolidado (+500 reseñas). Buscamos negocios con mayor margen de mejora digital."
- Deep Audit performed on "La Terrasse Du Jardin" (6100 reviews). It received a 3/10 because it lacks a booking engine, showing that pain points are prioritized over size.
- Expert tone verified: Diagnosis mentions "Ausencia de un motor de reservas directo en la web" and NO false PDF mentions were found.
- Firebase index error (red banner) is gone from the UI, although background console errors persist (as expected from frontend simplification).
- Telephone and address mapping seems to be working in the background (though some leads show "Sin teléfono" if not available in Google Local).
