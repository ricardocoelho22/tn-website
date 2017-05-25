(function(contact, $, undefined) {
  var statusAlert = {
    open:{
      maxHeight: '200px',
      padding: '15px'
    },
    closed: {
      maxHeight: '0',
      padding: '0'
    }
  };

  function showStatusAlert($form, status){
    switch(status){
      case 'sending':
        $form.find('.sending-alert').animate({
          maxHeight: statusAlert.open.maxHeight, 
          padding: statusAlert.open.padding
        }, {queue: false});
        break;
      case 'success':
        $form.find('.success-alert').animate({
          maxHeight: statusAlert.open.maxHeight, 
          padding: statusAlert.open.padding
        }, {queue: false});
        break;
      case 'fail':
      $form.find('.fail-alert').animate({
          maxHeight: statusAlert.open.maxHeight, 
          padding: statusAlert.open.padding
        }, {queue: false});
        break;
    }
  }

  function hideStatusAlert($form, status){
    switch(status){
      case 'sending':
        $form.find('.sending-alert').animate({
          maxHeight: statusAlert.closed.maxHeight, 
          padding: statusAlert.closed.padding
        }, {queue: false});
        break;
      case 'success':
        $form.find('.success-alert').animate({
          maxHeight: statusAlert.closed.maxHeight, 
          padding: statusAlert.closed.padding
        }, {queue: false});
        break;
      case 'fail':
      $form.find('.fail-alert').animate({
          maxHeight: statusAlert.closed.maxHeight, 
          padding: statusAlert.closed.padding
        }, {queue: false});
        break;
    }
  }

  function sendEmail(emailToken, message, success, fail) {
    $.ajax({
      method: 'POST',
      url: 'https://www.enformed.io/' + emailToken,
      data: message,
      datatype: 'json',
      success: success,
      error: fail
    });
  };

  function submitHandler(form, event) {
    var $form = $(form);
    event.preventDefault();
    showStatusAlert($form, 'sending');
    $form.find('*[type="submit"]').prop('disabled', true);
    sendEmail(SITE_DATA_SETTINGS.emailToken, $form.serialize(), 
      function() {
        hideStatusAlert($form, 'sending');
        showStatusAlert($form, 'success');
        $form.get(0).reset();
        $form.find('.valid').removeClass('valid');
        $form.find('*[type="submit"]').prop('disabled', false);
      },
      function(){
        hideStatusAlert($form, 'sending');
        showStatusAlert($form, 'fail');
        $form.find('*[type="submit"]').prop('disabled', false);
      });
  }

  function setValidator() {
    $('.section-contact #contact-form').validate({
      rules: {
        name: "required",
        email: {
          required: true,
          email: true
        },
        "*subject": "required",
        message: "required"
      },
      messages: {
        name: "Por favor, insira o seu nome.",
        email: {
          required: "Por favor, insira o seu email.",
          email: "Por favor, introduza um endereço de email válido."
        },
        "*subject": "Por favor, indique o assunto da sua mensagem.",
        message: "Por favor, insira uma mensagem a enviar."
      },
      submitHandler: submitHandler
    });
  }

  function onAlertClick(event) {
    var alert = $(event.target).parent();
    if (alert.hasClass('success-alert')) {
      hideStatusAlert($('#contact-form'), 'success');
    }else if (alert.hasClass('fail-alert')) {
      hideStatusAlert($('#contact-form'), 'fail');
    }
  }

  contact.init = function() {
    setValidator();
    $('.section-contact .status-alert .close-button').on('click', onAlertClick)
  };
}(window.contact = window.contact || {}, jQuery));