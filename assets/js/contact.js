(function(contact, $, undefined) {
  var status = {
    sending: 'sending',
    success: 'success',
    fail: 'fail'
  }

  function showStatusAlert($form, status){
    $form.find('.' + status + '-alert').addClass('active');
  }

  function hideStatusAlert($form, status){
    $form.find('.' + status + '-alert').removeClass('active');
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
    showStatusAlert($form, status.sending);
    $form.find('*[type="submit"]').prop('disabled', true);
    sendEmail(SITE_DATA_SETTINGS.emailToken, $form.serialize(), 
      function() {
        hideStatusAlert($form, status.sending);
        showStatusAlert($form, status.success);
        $form.get(0).reset();
        $form.find('.valid').removeClass('valid');
        $form.find('*[type="submit"]').prop('disabled', false);
      },
      function(){
        hideStatusAlert($form, status.sending);
        showStatusAlert($form, status.fail);
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

  contact.init = function() {
    setValidator();
    $('.section-contact .status-alert.success-alert .close-button').on('click', function() {
      hideStatusAlert($('.section-contact #contact-form'), status.success);
    });
    $('.section-contact .status-alert.fail-alert .close-button').on('click', function() {
      hideStatusAlert($('.section-contact #contact-form'), status.fail);
    });
  };
}(window.contact = window.contact || {}, jQuery));