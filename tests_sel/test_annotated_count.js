var assert = require("assert");
const {Builder, By, Key, until} = require ("selenium-webdriver");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function test_annotated_count(){
  
    //launch browser
    let driver = await new Builder().forBrowser('firefox').build();

    //navigate to app

    await driver.get('http://localhost:3000/');

    //exit opening message (using escape wasnt working)
    const hoverable = driver.findElement(By.className('sc-beqWaB heWUWm sc-hLseeU eCViBy reactour__close'));
    const actions = driver.actions({async: true}); 
    await actions.move({origin: hoverable}).click().perform();

    //go to Infinite Annotation game
    await driver.get('http://localhost:3000/logos/deep-search');

    //hit the Type Drop Down
    await driver.findElement(By.id(":r3:")).click();
    await driver.actions().sendKeys(Key.DOWN).perform();
    await driver.actions().sendKeys(Key.DOWN).perform();
    await driver.actions().sendKeys(Key.ENTER).perform();
    const value_text_input = driver.findElement(By.id(":r5:"));
    value_text_input.sendKeys("nutella");
    let update_button = await driver.findElement(By.id(":r7:"));
    await driver.wait(until.elementIsEnabled(update_button), 1000);
    sleep(3000).then(() => { driver.findElement(By.id(":r7:")).click(); });
    let test_count = driver.findElement(By.className("MuiTypography-root MuiTypography-h5 css-1ip83wv-MuiTypography-root"));
    assert(test_count.getText() !== null);
}
test_annotated_count();
