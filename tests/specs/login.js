describe("My Login Demo", () => {
  beforeEach(async () => {
    await $("~open menu").click();
    await $('//*[@text="Log In"]').click();
  });

  it("should not login with invalid credentials", async () => {
    await $('//*[@content-desc="Username input field"]').setValue("wrongUser");
    await $(
      '//android.widget.EditText[@content-desc="Password input field"]'
    ).setValue("wrongPassword");
    await $(
      '//android.view.ViewGroup[@content-desc="Login button"]/android.widget.TextView'
    ).click();
    await driver.pause(3000);

    await expect(
      $(
        '//android.view.ViewGroup[@content-desc="generic-error-message"]/android.widget.TextView'
      )
    ).toHaveText("Provided credentials do not match any user in this service.");
  });

  it("should login with valid credentials", async () => {
    await $('//*[@content-desc="Username input field"]').setValue(
      "bob@example.com"
    );
    await $(
      '//android.widget.EditText[@content-desc="Password input field"]'
    ).setValue("10203040");
    await $(
      '//android.view.ViewGroup[@content-desc="Login button"]/android.widget.TextView'
    ).click();
    const selector =
      'new UiSelector().text("Products").className("android.widget.TextView")';
    const productsUISelector = await $(`android=${selector}`);
    await expect(productsUISelector).toHaveText("Products");
  });
});
