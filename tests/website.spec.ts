import { test, expect } from "@playwright/test";
test("main pages, courses, images and SEO render", async ({ page }) => {
  for (const path of [
    "/",
    "/about",
    "/courses",
    "/contact",
    "/book-a-call",
    "/apply",
    "/privacy",
    "/terms",
    "/courses/shopify",
  ]) {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator('meta[name="description"]')).toHaveCount(1);
    expect(
      await page
        .locator("body")
        .evaluate((el) => el.scrollWidth <= window.innerWidth),
    ).toBeTruthy();
  }
  await page.goto("/");
  for (const image of await page.locator("img").all())
    expect(
      await image.evaluate(
        (el) =>
          (el as HTMLImageElement).complete &&
          (el as HTMLImageElement).naturalWidth > 0,
      ),
    ).toBeTruthy();
});
test("course search, filters, empty state and course detail", async ({
  page,
}) => {
  await page.goto("/courses");
  await expect(page.locator(".course-card")).toHaveCount(17);
  await page
    .getByRole("button", { name: "Trading Education", exact: true })
    .click();
  await expect(page.locator(".course-card")).toHaveCount(4);
  await page
    .getByRole("textbox", { name: "Search courses" })
    .fill("no such skill");
  await expect(page.locator(".course-card")).toHaveCount(0);
  await page.getByRole("button", { name: "Reset filters" }).click();
  await page.getByRole("textbox", { name: "Search courses" }).fill("Shopify");
  await expect(page.locator(".course-card")).toHaveCount(1);
  await page.locator(".course-card").click();
  await expect(page.locator("h1")).toHaveText("Shopify E-commerce");
  await page.locator(".module summary").first().click();
  await expect(page.locator(".module").first().locator("ul")).toBeVisible();
});
test("mobile menu, pages and overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of [
    "/",
    "/about",
    "/courses",
    "/contact",
    "/book-a-call",
    "/courses/shopify",
  ]) {
    await page.goto(path);
    expect(
      await page
        .locator("body")
        .evaluate((el) => el.scrollWidth <= window.innerWidth),
    ).toBeTruthy();
  }
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .locator("nav")
    .getByRole("link", { name: "Courses", exact: true })
    .click();
  await expect(page).toHaveURL(/\/courses$/);
  await expect(page.locator("nav")).not.toBeVisible();
});
test("forms fail honestly without service configuration", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("textbox", { name: "Full name" }).fill("Test Learner");
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("learner@example.com");
  await page
    .getByRole("textbox", { name: "Phone number" })
    .fill("+923001234567");
  await page.getByRole("textbox", { name: "Subject" }).fill("Course question");
  await page
    .getByRole("textbox", { name: "Your message" })
    .fill("I would like to learn about Shopify.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator(".form-error")).toContainText("not available yet");
  await expect(page.getByText("Your request is with us.")).toHaveCount(0);
});
test("server rejects invalid and cross-origin submissions", async ({
  request,
}) => {
  const invalid = await request.post("/api/inquiries", {
    headers: { origin: "http://127.0.0.1:3000" },
    data: { name: "a" },
  });
  expect(invalid.status()).toBe(400);
  const cross = await request.post("/api/inquiries", {
    headers: { origin: "https://other.example" },
    data: {},
  });
  expect(cross.status()).toBe(403);
  const missing = await request.get("/does-not-exist");
  expect(missing.status()).toBe(404);
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/robots.txt")).status()).toBe(200);
});

test("branch contacts, maps, social links and WhatsApp destinations", async ({
  page,
}) => {
  await page.goto("/contact");
  await expect(page.locator(".branch-card")).toHaveCount(2);
  await expect(page.locator(".branch-card").first()).toContainText(
    "Office No. 408",
  );
  await expect(page.locator(".branch-card").nth(1)).toContainText(
    "Office No. 206",
  );
  await expect(
    page.locator('a[href="mailto:digitalempire999@gmail.com"]').first(),
  ).toBeVisible();
  await expect(
    page.locator(".branch-card").first().locator(".branch-phone"),
  ).toHaveAttribute("href", "tel:+923323605392");
  await expect(
    page.locator(".branch-card").nth(1).locator(".branch-phone"),
  ).toHaveAttribute("href", "tel:+923272452001");
  await expect(page.locator(".contact-socials a").first()).toHaveAttribute(
    "href",
    "https://www.instagram.com/digitalempireuniversity/",
  );
  await page
    .locator(".branch-card")
    .first()
    .getByRole("button", { name: "Show branch map" })
    .click();
  await expect(page.locator("#map-saddar")).toBeVisible();
  await expect(page.locator("#map-saddar")).toHaveAttribute(
    "src",
    /Office%20No/,
  );
  await page
    .locator(".branch-card")
    .first()
    .getByRole("button", { name: "Hide map" })
    .click();
  await page
    .getByRole("button", { name: "Chat on WhatsApp", exact: true })
    .click();
  const panel = page.getByRole("region", { name: "Choose a WhatsApp branch" });
  await expect(panel).toBeVisible();
  await expect(panel.locator("a").first()).toHaveAttribute(
    "href",
    /^https:\/\/wa.me\/923323605392\?text=/,
  );
  await expect(panel.locator("a").nth(1)).toHaveAttribute(
    "href",
    /^https:\/\/wa.me\/923272452001\?text=/,
  );
  await page.keyboard.press("Escape");
  await expect(panel).not.toBeVisible();
});
test("3D hero animation can be paused and reduced motion is respected", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Pause 3D animation" }).click();
  await expect(page.locator(".empire-scene")).toHaveClass(/scene-paused/);
  await expect(
    page.getByRole("button", { name: "Play 3D animation" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Play 3D animation" }).click();
  await expect(page.locator(".empire-scene")).not.toHaveClass(/scene-paused/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator(".scene-artwork")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});
test("WhatsApp form handoff includes chosen branch and entered details without claiming delivery", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByRole("textbox", { name: "Full name" }).fill("Test Learner");
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("learner@example.com");
  await page
    .getByRole("textbox", { name: "Phone number" })
    .fill("+923001234567");
  await page
    .getByRole("textbox", { name: "Subject" })
    .fill("Shopify admission");
  await page
    .getByRole("textbox", { name: "Your message" })
    .fill("Please share course availability.");
  await page.getByRole("checkbox").check();
  await page.getByLabel("Choose your branch").selectOption("gulshan");
  await page.getByRole("button", { name: "Prepare WhatsApp message" }).click();
  const link = page.getByRole("link", { name: "Open WhatsApp to send" });
  const url = new URL((await link.getAttribute("href"))!);
  expect(url.pathname).toBe("/923272452001");
  expect(url.searchParams.get("text")).toContain("Test Learner");
  expect(url.searchParams.get("text")).toContain("Gulshan Branch");
  await expect(page.locator(".whatsapp-handoff")).toContainText(
    "have not been sent or saved",
  );
  await expect(page.getByText("Your request is with us.")).toHaveCount(0);
});

test("premium navigation exposes course paths and original platform assets load", async ({
  page,
}) => {
  await page.goto("/");
  for (const brand of ["shopify", "amazon", "google", "etsy"]) {
    const logo = page.locator(`.premium-platforms .platform-logo-${brand}`);
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("src", `/logos/${brand}.svg`);
    expect(
      await logo.evaluate((el) => (el as HTMLImageElement).naturalWidth > 0),
    ).toBeTruthy();
  }
  await page.getByRole("button", { name: "Explore learning paths" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#course-mega-menu")).toBeVisible();
  await page.locator('#course-mega-menu a[href="/courses/amazon"]').click();
  await expect(page).toHaveURL(/\/courses\/amazon$/);
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, 700));
  await expect(page.locator("header")).toHaveClass(/header-scrolled/);
});

test("editorial navigation stays centered and contact navigation reaches the expanded campus section", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const nav = await page.locator("header nav").boundingBox();
  expect(nav).not.toBeNull();
  expect(Math.abs(nav!.x + nav!.width / 2 - 720)).toBeLessThan(2);
  await expect(page.locator(".learning-bento>a")).toHaveCount(3);
  await page.goto("/contact");
  await page
    .getByRole("link", { name: "Find your campus", exact: true })
    .last()
    .click();
  await expect(page).toHaveURL(/#our-campuses$/);
  await expect(page.locator(".branch-card")).toHaveCount(2);
});
