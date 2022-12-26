const {page} = require('../po');

describe('Doctors Page Test Suite', () => {
  beforeEach(async () => {
    await page('dashboard').open();
  });

  it('should open page', async () => {
    await expect(browser).toHaveTitle('Appointment Planner - Syncfusion Angular Components Showcase App');
  });

  it('should open modal', async () => {
    await page('dashboard').sideMenu.item('doctors').click();
    await page('doctors').doctorListHeader.addNewDoctorBtn.click();
    await expect(page('doctors').addDoctorModal.rootEl).toBeDisplayed();
  });

  it('should validate name error label', async () => {
    await page('dashboard').sideMenu.item('doctors').click();
    await page('doctors').doctorListHeader.addNewDoctorBtn.click();
    await expect(page('doctors').addDoctorModal.rootEl).toBeDisplayed();

    await page('doctors').addDoctorModal.saveBtn.click();
    await expect(page('doctors').addDoctorModal.label('labelName')).toHaveText('Enter valid name');
    await page('doctors').addDoctorModal.input('name').setValue('John Doe');
    await expect(page('doctors').addDoctorModal.label('labelName')).not.toBeDisplayed();
  });

  it('should validate email error label', async () => {
    await page('dashboard').sideMenu.item('doctors').click();
    await page('doctors').doctorListHeader.addNewDoctorBtn.click();
    await expect(page('doctors').addDoctorModal.rootEl).toBeDisplayed();

    await page('doctors').addDoctorModal.saveBtn.click();
    await expect(page('doctors').addDoctorModal.label('labelEmail')).toHaveText('Enter valid email');
    await page('doctors').addDoctorModal.input('email').setValue('John_Doe');
    await expect(page('doctors').addDoctorModal.label('labelEmail')).toHaveText('Email address is invalid');
    await page('doctors').addDoctorModal.input('email').addValue('@test.com');
    await expect(page('doctors').addDoctorModal.label('labelEmail')).not.toBeDisplayed();
  });

  it('should validate phone number error label', async () => {
    await page('dashboard').sideMenu.item('doctors').click();
    await page('doctors').doctorListHeader.addNewDoctorBtn.click();
    await expect(page('doctors').addDoctorModal.rootEl).toBeDisplayed();

    await page('doctors').addDoctorModal.saveBtn.click();
    await expect(page('doctors').addDoctorModal.label('labelPhone')).toHaveText('Enter valid mobile number');
    await page('doctors').addDoctorModal.input('phone').setValue('12345');
    await expect(page('doctors').addDoctorModal.label('labelPhone')).toHaveText('Enter valid mobile number');
    await page('doctors').addDoctorModal.input('phone').addValue('67890');
    await expect(page('doctors').addDoctorModal.label('labelPhone')).not.toBeDisplayed();
  });

  it('should validate education error label', async () => {
    await page('dashboard').sideMenu.item('doctors').click();
    await page('doctors').doctorListHeader.addNewDoctorBtn.click();
    await expect(page('doctors').addDoctorModal.rootEl).toBeDisplayed();

    await page('doctors').addDoctorModal.saveBtn.click();
    await expect(page('doctors').addDoctorModal.label('labelEducation')).toHaveText('Enter valid education');
    await page('doctors').addDoctorModal.input('education').setValue('MS');
    await expect(page('doctors').addDoctorModal.label('labelEducation')).not.toBeDisplayed();
  });

  it('should add doctor', async () => {
    await page('dashboard').sideMenu.item('doctors').click();
    await page('doctors').doctorListHeader.addNewDoctorBtn.click();
    await expect(page('doctors').addDoctorModal.rootEl).toBeDisplayed();

    await page('doctors').addDoctorModal.input('name').setValue('John Doe');
    await page('doctors').addDoctorModal.input('phone').setValue('1111111111');
    await page('doctors').addDoctorModal.input('email').setValue('test@test.com');
    await page('doctors').addDoctorModal.input('education').setValue('Basic');
    await page('doctors').addDoctorModal.input('designation').setValue('Test');

    await page('doctors').addDoctorModal.saveBtn.click();

    await expect(page('doctors').addDoctorModal.rootEl).not.toBeDisplayed();

    await expect(page('doctors').specialistCard(8).name).toHaveTextContaining('John Doe');
    await expect(page('doctors').specialistCard(8).education).toHaveTextContaining('Basic', {
      ignoreCase: true,
    });
  });

  it('should close modal', async () => {
    await page('dashboard').sideMenu.item('doctors').click();
    await page('doctors').doctorListHeader.addNewDoctorBtn.click();
    await page('doctors').addDoctorModal.closeBtn.click();
    await expect(page('doctors').addDoctorModal.rootEl).not.toBeDisplayed();
  });
});
