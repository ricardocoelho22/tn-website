(function (gallery, $, undefined) {
  var currentModalImageIndex = 0;
  var galleryImages = SITE_DATA_SETTINGS.galleryImages;

  function setModalImage(galleryModal, imageData) {
    var modalImageElem = galleryModal.find('img')[0];
    var modalCaptionElem = galleryModal.find('.modal-caption')[0];
    modalImageElem.src = imageData.full;
    modalImageElem.alt = imageData.caption;
    modalCaptionElem.innerHTML = imageData.caption;
  };

  function getImageIndex(imageElem){
    return parseInt(imageElem.attr('id').split('-')[1]);
  };

  function onThumbnailClick(event) {
    var galleryModal = $('#galleryModal');
    var imgIndex = getImageIndex($(this));
    var imageData = galleryImages[imgIndex];
    setModalImage(galleryModal, imageData);
    galleryModal.find('.nav-left').attr('disabled', imgIndex <= 0);
    galleryModal.find('.nav-right').attr('disabled', imgIndex >= galleryImages.length-1);
    currentModalImageIndex = imgIndex;
    galleryModal.modal();
  };

  function onLeftArrowClick(event) {
    var currentImgIndex = currentModalImageIndex;
    if (currentImgIndex > 0) {
      var galleryModal = $('#galleryModal');
      var newImgIndex = currentImgIndex - 1;
      var imageData = galleryImages[newImgIndex];
      setModalImage(galleryModal, imageData);
      galleryModal.find('.nav-left').attr('disabled', newImgIndex <= 0);
      galleryModal.find('.nav-right').attr('disabled', false);
      currentModalImageIndex = newImgIndex;
    }
  };

  function onRightArrowClick(event) {
    var currentImgIndex = currentModalImageIndex;
    if (currentImgIndex < galleryImages.length-1) {
      var galleryModal = $('#galleryModal');
      var newImgIndex = currentImgIndex + 1;
      var imageData = galleryImages[newImgIndex];
      setModalImage(galleryModal, imageData);
      galleryModal.find('.nav-left').attr('disabled', false);
      galleryModal.find('.nav-right').attr('disabled', newImgIndex >= galleryImages.length-1);
      currentModalImageIndex = newImgIndex;
    }
  };

  gallery.init = function() {
    $('.section-gallery *[id^=gallery_img-]').on('click', onThumbnailClick);
    $('.nav-left').on('click', onLeftArrowClick);
    $('.nav-right').on('click', onRightArrowClick);
  };
}(window.gallery = window.gallery || {}, jQuery));