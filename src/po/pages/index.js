const DashboardPage = require('./dashboard.page');
const DoctorsPage = require('./doctors.page');

/**
 * @param name {'dashboard' | 'doctors'}
 * @return {DashboardPage|DoctorsPage}
 */
function page(name) {
  const items = {
    dashboard: new DashboardPage(),
    doctors: new DoctorsPage(),
  };
  return items[name.toLowerCase()];
}

module.exports = {
  DashboardPage,
  DoctorsPage,
  page,
};
