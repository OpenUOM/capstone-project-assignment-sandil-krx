import { Selector, ClientFunction } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Student UI`
    .page`http://localhost:4401/addStudent`
    .beforeEach(async t => {
        await t.setTestSpeed(0.75); // Slows down the test a bit to avoid race conditions
        await t.setPageLoadTimeout(10000); // Increase timeout (default is 3000ms)
    });

test('Testing add students', async t => {
    const getLocation = ClientFunction(() => window.location.href);

    await t.navigateTo("/dbinitialize");

    await t.navigateTo("/addStudent");
    await t.expect(getLocation()).contains('/addStudent', { timeout: 5000 });

    await t.typeText("#student-id", "999999");
    await t.typeText("#student-name", "Pasindu Basnayaka");
    await t.typeText("#student-age", "45");
    await t.typeText("#student-Hometown", "Catholic");
    await t.click("#student-add");

    await t.navigateTo("/student");

    const table = Selector('#student-table');
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    await t.expect(tdText).contains("Pasindu Basnayaka");
});

