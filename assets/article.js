//- To see the process of how I made this dark mode toggle, watch this tutorial video:
//- https://youtu.be/42gltu11wb8



// Dark Mode Setup

var darkMode;

if (localStorage.getItem('dark-mode')) {  
  // if dark mode is in storage, set variable with that value
  darkMode = localStorage.getItem('dark-mode');  
} else {  
  // if dark mode is not in storage, set variable to 'light'
  darkMode = 'light';  
}

// set new localStorage value
localStorage.setItem('dark-mode', darkMode);



if (localStorage.getItem('dark-mode') == 'dark') {
  // if the above is 'dark' then apply .dark to the body
  $('body').addClass('dark');  
  // hide the 'dark' button
  $('.dark-button').hide();
  // show the 'light' button
  $('.light-button').show();
}


// Toggle dark UI

$('.dark-button').on('click', function() {  
  $('.dark-button').hide();
  $('.light-button').show();
  $('body').addClass('dark');  
  // set stored value to 'dark'
  localStorage.setItem('dark-mode', 'dark');
});

$('.light-button').on('click', function() {  
  $('.light-button').hide();
  $('.dark-button').show();
  $('body').removeClass('dark');
  // set stored value to 'light'
  localStorage.setItem('dark-mode', 'light');   
});



//--------------------------------------------------
// Below is all that is neede for the basic toggle
//--------------------------------------------------

// $('.dark-button').on('click', function() {  
//   $('.dark-button').hide();
//   $('.light-button').show();
//   $('body').addClass('dark');
// });

// $('.light-button').on('click', function() {  
//   $('.light-button').hide();
//   $('.dark-button').show();
//   $('body').removeClass('dark');  
// });