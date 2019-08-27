function openSideMenu() {
  document.getElementById('side-menu').style.width = '250px';
  //Pushes Main Content With Side Nav:
  // document.getElementById('main').style.marginLeft = '250px';
}

function closeSideMenu() {
  document.getElementById('side-menu').style.width = '0px';
  document.getElementById('menu-filter').value = '';
  filterInput();
  //Pushes Main Content With Side Nav:
  // document.getElementById('main').style.marginLeft = '0px';
}
