# Digital Empire Content Studio
## Routes
- /admin: private CMS login
- /admin?design=1: public design-only preview, with no database access or publishing
- /?cmsPreview=1: saved draft preview; only the authenticated allowlisted admin receives drafts
## Production setup
1. Create a separate Digital Empire Supabase project (do not use the unrelated ERP project).
2. Run supabase/schema.sql, then supabase/admin-cms.sql in its SQL editor.
3. Configure SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and ADMIN_EMAILS in Vercel server environment variables. Never commit their values.
4. Create the intended admin in Supabase Authentication and let the owner set their password securely. Public admin signup is not provided.
5. Redeploy after environment configuration. Verify admin login, upload, save draft, publish and inquiry inbox before considering setup complete.
## Editor
Existing homepage sections can be reordered and hidden. Hero copy, founder title and About Us are editable. Add text, gallery and reviews blocks. Gallery and reviews collections are published together with the page. Other custom built-in section layouts and separate course/forex pages are maintained in code.
## Data & security
CMS and inbox queries run server-side. Every protected route validates the Supabase session and ADMIN_EMAILS. Images are public media, not private documents. Database tables have RLS enabled without public policies. Cookie sessions expire after the Supabase access token lifetime. Publishing invalidates the cached homepage data; draft preview never exposes content to anonymous visitors.
Inquiries are saved without requiring Resend. Email notifications are optional.
## Current external blocker
The supplied organization login cannot create projects (Supabase displays an additional-permissions error). Database provisioning and production account validation require the organization owner.

Requested admin email: digitalempireuniversiy@gmail.com
