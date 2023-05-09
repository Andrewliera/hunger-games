var assert = require('assert');
const {Builder,By, Key} = require ("selenium-webdriver");

async function test_drop_down(){
  
  //launch browser
  let driver = await new Builder().forBrowser('firefox').build();

  //navigate to app
  await driver.get('http://localhost:3000/');

  //exit opening message (using escape wasnt working)
  const hoverable = driver.findElement(By.className('sc-beqWaB heWUWm sc-hLseeU eCViBy reactour__close'));
  const actions = driver.actions({async: true}); 
  await actions.move({origin: hoverable}).click().perform();
  
  //go to settings
  await driver.get('http://localhost:3000/settings');

  //hit the country drop down
  await driver.findElement(By.id(":r5:")).click();
  
  //press tab and press enter 
  await driver.actions().sendKeys(Key.ESCAPE).perform();
  await driver.actions().sendKeys(Key.ENTER, Key.ENTER).perform();
  
  
  //get the value
  const label = await driver.findElement(By.id(":r5:")).getText();
  const test = "Bulgium";
  assert(test === label);

}
test_drop_down();
