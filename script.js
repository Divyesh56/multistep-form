$(document).ready(function() {
  // Initially show Home Details
  function updateActiveCircle(target) {
    $('.circle').removeClass('active');
    $(`.circle.${target}`).addClass('active');
}
  $("#1-details").show();
  $(`.circle.1`).addClass('active');
  
  // Handle click events on sidebar items
  $(".sidebar-item").click(function() {
    // Get the target step
    var targetStep = $(this).data("target");
    
    // Hide all detail forms
    $(".detail-form").hide();
    
  
    
    // Show the detail form corresponding to the clicked step
    $("#" + targetStep + "-details").show();
    updateActiveCircle(targetStep);


  });

  // Handle click event on the "Go Back" button
  $(".go-back-btn").click(function(event) {

    // Prevent default form submission behavior
    event.preventDefault();
    // Get the current form
    var currentForm = $(this).closest('.detail-form');
   
    
    // Hide the current form
    currentForm.hide();
    
    // Get the previous form
    var prevForm = currentForm.prev(".detail-form");
   
    // Show the previous form
    prevForm.show();
    updateActiveCircle(prevForm[0].id[0])
    
  });

  // Handle click event on the "Next Step" button
  $(document).ready(function() {
    $("#Personal-form").click(function(event) {
      event.preventDefault();
  
      var isValid = true;
  
      // Clear previous error messages
      $(".error-message").text("").hide();
      $("input").removeClass("invalid");
  
      // Validate each required field
      if ($("#name").val().trim() === "") {
        $("#name-error").text("Name is required").show();
        $("#name").addClass("invalid");
        isValid = false;
      }
  
      var email = $("#email").val().trim();
      if (email === "") {
        $("#email-error").text("Email is required").show();
        $("#email").addClass("invalid");
        isValid = false;
      } else {
        // Check if the email format is valid
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          $("#email-error").text("Invalid email format").show();
          $("#email").addClass("invalid");
          isValid = false;
        }
      }
  
      var phone = $("#phone").val().trim();
      if (phone === "") {
        $("#phone-error").text("Phone number is required").show();
        $("#phone").addClass("invalid");
        isValid = false;
      } else {
        // Check if the phone number format is valid
        var phonePattern = /^[0-9]{3}[0-9]{3}[0-9]{4}$/;
        if (!phonePattern.test(phone)) {
          $("#phone-error").text("Invalid phone number format").show();
          $("#phone").addClass("invalid");
          isValid = false;
        }
      }
  
      // If all fields are valid, proceed to the next form
      if (isValid) {
        var currentForm = $(this).closest('.detail-form');
        currentForm.hide();
        var nextForm = currentForm.next(".detail-form");
       
        nextForm.show();
        updateActiveCircle(nextForm[0].id[0]);
      }
    });
  });
  
  
  
  
});




$(document).ready(function() {
  const $planBoxes = $('.plan-box');
  const $paymentToggle = $('#payment-toggle');
  const $nextButton = $('#plan-selection-form .next-btn');
  const $addonsNextButton = $('#addons-selection-form .next-btn');
  const $selectedPlanNameEl = $('.selected-plan-name');
  const $addonPriceEl = $('#pride');
  const $selectedAddonsEl = $('.selected-addons');
  const $selectedAddonPricesEl = $('.selected-addon-prices');
  const $addonsSection = $('#3-details');
  const $summarySection = $('#4-details');
  const $totalPriceEl = $('.total-price');
  const $confirm = $('#confirm');
 
  let $selectedPlan = null;

  function updatePlanPrices() {
    const isMonthly = $paymentToggle.prop('checked');
    $planBoxes.each(function() {
      const $box = $(this);
      const monthlyPrice = $box.data('monthly');
      const yearlyPrice = $box.data('yearly');
      $box.find('.plan-price').text(isMonthly ? `$${monthlyPrice}/mo` : `$${yearlyPrice}/yr`);
    });
    updateAddonPrices();
  }

  function updateAddonPrices() {
    const isMonthly = $paymentToggle.prop('checked');
    $('.addon-box .addon-price').each(function() {
      const $price = $(this);
      const monthlyPrice = $price.data('monthly');
      const yearlyPrice = $price.data('yearly');
      $price.text(isMonthly ? `+$${monthlyPrice}/mo` : `+$${yearlyPrice}/yr`);
    });
  }

  function selectPlan($planBox) {
    if ($selectedPlan) {
      $selectedPlan.removeClass('selected');
    }
    $selectedPlan = $planBox;
    $selectedPlan.addClass('selected');
  }

  function getSelectedPlanDetails() {
    if (!$selectedPlan) return null;
    const planName = $selectedPlan.data('plan');
    const isMonthly = $paymentToggle.prop('checked');
    const planPrice = isMonthly ? $selectedPlan.data('monthly') : $selectedPlan.data('yearly');
    return {
      name: planName,
      price: planPrice,
      billing: isMonthly ? 'monthly' : 'yearly'
    };
  }

  function updateActiveCircle(target) {
    $('.circle').removeClass('active');
    $(`.circle.${target}`).addClass('active');
}

  $planBoxes.on('click', function() {
    selectPlan($(this));
  });

  $paymentToggle.on('change', function() {
    updatePlanPrices();
    if ($selectedPlan) {
      selectPlan($selectedPlan);
    }
  });

  $confirm.on('click', function(event) {
    event.preventDefault();
    console.log('clicked');
    $('.detail-form').hide();
    $('#5-details').show()
  });



  $nextButton.on('click', function(event) {
    event.preventDefault();
    const planDetails = getSelectedPlanDetails();
    if (planDetails) {
      $selectedPlanNameEl.text(`${planDetails.name} (${planDetails.billing})`);
      $addonPriceEl.text(`$${planDetails.price}/${planDetails.billing === 'monthly' ? 'mo' : 'yr'}`);
      // $addonsSection.show(); // Show the add-ons section
      $(".detail-form").hide();
      $("#3-details").show(); // Show the next form
      updateActiveCircle("3");
    } else {
      alert('Please select a plan.');
    }
    updateAddonPrices();
  });

  
  updatePlanPrices();

  $addonsNextButton.on('click', function(event) {
    event.preventDefault();
    const isMonthly = $paymentToggle.prop('checked');
    const selectedAddons = [];
    const addonPrices = [];
    let totalPrice = 0;

    $('.addon-box input[type="checkbox"]:checked').each(function() {
      const $addonBox = $(this).closest('.addon-box');
      const addonName = $addonBox.find('.addon-details h2').text();
      const addonPrice = isMonthly ? $addonBox.find('.addon-price').data('monthly') : $addonBox.find('.addon-price').data('yearly');
      selectedAddons.push(`<p>${addonName}</p>`);
      addonPrices.push(`<p>+${addonPrice}/${isMonthly ? 'mo' : 'yr'}</p>`);
      totalPrice += parseFloat(addonPrice);
    });

    // Update the selected add-ons and their prices
    $selectedAddonsEl.html(selectedAddons.join(''));
    $selectedAddonPricesEl.html(addonPrices.join(''));

    // Calculate and display the total price
    const planDetails = getSelectedPlanDetails();
    if (planDetails) {
      $addonPriceEl.text(`$${planDetails.price}/${planDetails.billing === 'monthly' ? 'mo' : 'yr'}`);
      
      totalPrice += parseFloat(planDetails.price);
      $totalPriceEl.text(`$${totalPrice}/${isMonthly ? 'mo' : 'yr'}`);
    }

    // $addonsSection.hide(); // Hide the add-ons section
    // $summarySection.show(); // Show the summary section
    $(".detail-form").hide();
    $("#4-details").show(); // Show the next form
    updateActiveCircle("4");
  });
   
});

$(document).ready(function() {
  $('#payment-toggle').on('change', function() {
    if ($(this).is(':checked')) {
      $('.free-plan').css("display", "none");
      $('#toggle-label-yearly').addClass('.change');
    } else {
      $('.free-plan').css("display", "block");
      $('#toggle-label-monthly').addClass('.change');
     
    }
  });
});