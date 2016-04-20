$(function() {

  $('input.cb').on('change', function() {
    $('input.cb').not(this).prop('checked', false);
  });

  $('#login').on('click', function(e) {
    $('#register-username').attr('name', 'username').attr("id", "username");
    $('#register-password').attr('name', 'password').attr("id", "password");
    $('#login-submit').removeClass('hide');
    $('#register-submit').addClass('hide');
    $('#confirm-password, #fullname').removeAttr('required');
    $(".register-form").slideUp();
    $('.alert-error').text("");
    $('#registration').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });
  $('#registration').on('click', function(e) {
    $('#username').attr('name', 'register-username').attr("id", "register-username");
    $('#password').attr('name', 'register-password').attr("id", "register-password");
    $('#register-submit').removeClass('hide');
    $('#login-submit').addClass('hide');
    $('#confirm-password, #fullname').attr('required', '');
    $(".register-form").slideDown();
    $('.alert-error').text("");
    $('#login').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });

  $('#register-submit').on('click', function() {

    if ($("#confirm-password").val() !== $("#register-password").val()) {
      $('.alert-error').text("Paroolid peavad kattuma!");
      $('#register-password').val('').focus();
      $('#confirm-password').val('');
      return false;
    } else if ($("#register-username").val() === "") {
      $('.alert-error').text("Palun täida väli!");
      $('#register-username').focus();
      return false;
    } else if ($("#fullname").val() === "") {
      $('.alert-error').text("Palun täida väli!");
      $('#fullname').focus();
      return false;
    } else if ($("#register-password").val() === "") {
      $('.alert-error').text("Palun täida väli!");
      $('#register-password').focus();
      return false;
    } else if ($("#confirm-password").val() === "") {
      $('.alert-error').text("Palun täida väli!");
      $('#confirm-password').focus();
      return false;
    } else {
      if ($("#student-cb").is(':checked')) {
        var studentEntity = {
          'username': $("#register-username").val(),
          'password': $("#confirm-password").val(),
          'fullname': $("#fullname").val()
        };
        localStorage.setItem('studentEntity', JSON.stringify(studentEntity));
        window.location = "loginform.html";
        return false;
      } else {
        var teacherEntity = {
          'username': $("#register-username").val(),
          'password': $("#confirm-password").val(),
          'fullname': $("#fullname").val()
        };
        localStorage.setItem('teacherEntity', JSON.stringify(teacherEntity));
        window.location = "loginform.html";
        return false;
      }
    }
  });

  $('#login-submit').on('click', function(event) {
    event.preventDefault();

    if (localStorage.getItem('studentEntity') !== null) {
      var studentObject = localStorage.getItem('studentEntity');
    }

    if (localStorage.getItem('teacherEntity') !== null) {
      var teacherObject = localStorage.getItem('teacherEntity');
    }

    if (studentObject) {
      if ($("#username").val() == JSON.parse(studentObject).username &&
        $("#password").val() == JSON.parse(studentObject).password) {
        window.location = "studentindex.html";
        return false;
      }
    } else if (teacherObject) {
      if ($("#username").val() == JSON.parse(teacherObject).username &&
        $("#password").val() == JSON.parse(teacherObject).password) {
        window.location = "teacherindex.html";
        return false;
      }
    }
    $('.alert-error').text("Vale kasutajanimi või parool!");
    $('#password').val('').focus();
    return false;

  });

});

