import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class SeleniumTests {

    @Test
    @DisplayName("User logs in application, goes to rent scooter page, adds new scooter to his scooter list and adds new listing for that scooter")
    public void testAddNewScooterAndListing() {
        System.setProperty("webdriver.chrome.driver", "C:\\Program Files (x86)\\chromedriver-win64\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("https://scoot-share.onrender.com/");

        loginAsUser(driver, "dino", "dinobabic");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.not(ExpectedConditions.urlContains("/login")));
        Assertions.assertFalse(driver.getCurrentUrl().contains("/login"));

        driver.findElement(By.className("hamburger-menu-button")).click();
        driver.findElement(By.className("rent-scooter-btn")).click();
        driver.findElement(By.className("add-scooter-image-input")).sendKeys("C:\\Users\\Korisnik\\Downloads\\scooter-3.jpg");
        driver.findElement(By.className("submit-scooter-btn")).click();

        Assertions.assertEquals(1, driver.findElement(By.className("scooters-list")).findElements(By.tagName("tr")).size());

        driver.findElement(By.className("ready-to-rent-btn")).click();
        driver.findElement(By.className("location-input")).sendKeys("Zagreb");
        driver.findElement(By.className("return-location-input")).sendKeys("Zagreb");
        driver.findElement(By.className("price-per-kilometer-input")).sendKeys("2.5");
        driver.findElement(By.className("penalty-input")).sendKeys("25");
        driver.findElement(By.className("create-listing-btn")).click();

        Assertions.assertTrue(driver.findElement(By.className("scooter-rented-label")).isDisplayed());
    }

    @Test
    @DisplayName("User logs into application and rents scooter")
    public void testRentScooter() {
        System.setProperty("webdriver.chrome.driver", "C:\\Program Files (x86)\\chromedriver-win64\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("https://scoot-share.onrender.com/");

        loginAsUser(driver, "dino", "dinobabic");

        driver.findElement(By.className("listing-0")).click();
        Assertions.assertTrue(driver.getCurrentUrl().contains("/listing"));


        driver.findElement(By.className("rent-btn")).click();
        Assertions.assertTrue(driver.getCurrentUrl().contains("/my-rentals"));

        Assertions.assertEquals(1, driver.findElements(By.className("rental-item")).size());
    }

    @Test
    @DisplayName("Testing chat between two users")
    public void testChat() throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", "C:\\Program Files (x86)\\chromedriver-win64\\chromedriver.exe");

        WebDriver driverDino = new ChromeDriver();
        driverDino.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driverDino.get("https://scoot-share.onrender.com/");

        WebDriver driverMarko = new ChromeDriver();
        driverMarko.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driverMarko.get("https://scoot-share.onrender.com/");

        loginAsUser(driverDino, "dino", "dinobabic");
        loginAsUser(driverMarko, "marko", "markomarkic");

        driverDino.findElement(By.className("hamburger-menu-button")).click();
        driverDino.findElement(By.className("chat-btn")).click();
        Assertions.assertTrue(driverDino.getCurrentUrl().contains("/chat"));

        driverMarko.findElement(By.className("hamburger-menu-button")).click();
        driverMarko.findElement(By.className("chat-btn")).click();
        Assertions.assertTrue(driverMarko.getCurrentUrl().contains("/chat"));

        driverDino.findElement(By.className("room-marko")).click();
        driverMarko.findElement(By.className("room-dino")).click();

        Assertions.assertEquals(0, driverDino.findElements(By.className("message")).size());
        Assertions.assertEquals(0, driverMarko.findElements(By.className("message")).size());

        driverDino.findElement(By.className("message-content-input")).sendKeys("Pozdrav, Marko");
        driverDino.findElement(By.className("send-message-btn")).click();

        Thread.sleep(500);

        Assertions.assertEquals(1, driverDino.findElements(By.className("message")).size());
        Assertions.assertEquals(1, driverMarko.findElements(By.className("message")).size());

        driverMarko.findElement(By.className("message-content-input")).sendKeys("Pozdrav, Dino");
        driverMarko.findElement(By.className("send-message-btn")).click();

        Thread.sleep(500);

        Assertions.assertEquals(2, driverDino.findElements(By.className("message")).size());
        Assertions.assertEquals(2, driverMarko.findElements(By.className("message")).size());
    }

    private void loginAsUser(WebDriver driver, String username, String password) {
        driver.findElement(By.className("hamburger-menu-button")).click();
        driver.findElement(By.className("login-btn")).click();

        driver.findElement(By.className("username-input")).sendKeys(username);
        driver.findElement(By.className("password-input")).sendKeys(password);

        driver.findElement(By.className("submit-login-btn")).click();
    }

}
