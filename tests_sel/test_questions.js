const {Builder,By} = require ("selenium-webdriver");

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
  await driver.get('http://localhost:3000/questions');

  await driver.findElement(By.className('MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root'));


}
test_drop_down();