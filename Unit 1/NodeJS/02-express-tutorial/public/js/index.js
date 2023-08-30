/*
  The color effects and animation are done via CSS. This bit of JavaScript just lets you toggle the luminaires and turns a few on to start.
*/
$(function() {
  $('.logo:nth-child(2n)').addClass('on');
  $('.logo').on('click', function() {
    $(this).toggleClass('on');
  });
});

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
