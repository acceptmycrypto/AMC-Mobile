function showSnackBar() {
  // Get the snackbar DIV
  var snackbar = document.getElementById('snackbar');

  // Add the "show" class to DIV
  snackbar.className = 'show';

  // After 3 seconds, remove the show class from DIV
  setTimeout(function() {
    snackbar.className = snackbar.className.replace('show', '');
  }, 5000);
}

showSnackBar();
