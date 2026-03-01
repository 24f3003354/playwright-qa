const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [51,52,53,54,55,56,57,58,59,60];
  let grandTotal = 0;

  for (let seed of seeds) {

    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log("Opening:", url);

    await page.goto(url);
    await page.waitForSelector("table", { timeout: 60000 });

    const numbers = await page.$$eval("table td", cells =>
      cells.map(cell => parseFloat(cell.innerText))
           .filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a,b)=>a+b,0);

    console.log(`Seed ${seed} total =`, sum);

    grandTotal += sum;
  }

  console.log("FINAL TOTAL =", grandTotal);

  await browser.close();
})();