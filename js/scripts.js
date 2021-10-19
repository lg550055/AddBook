$(document).ready(function() {
  let book = [];

  $("#new").submit(function() {
    event.preventDefault();
    const person = {name:$('#name').val(), last:$('#last').val(), email:$('#email').val(), phone:$('#phone').val() };
    book.push( person );
    $('#book').append( '<li class="list-group-item">' + person.last + ', ' + person.name + '</li>' )

  });

  $('.list-group').click(function() {
    alert( $(this.email) );
  });

});
