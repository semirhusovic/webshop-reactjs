var payment = new PaymentJs();
payment.init('LhBhASbfn8hHLnZDl5w9', 'number_div', 'cvv_div', function(payment) {
    payment.setNumberStyle({ 
        'border': '1px solid #e5e7eb',
        'height': '2.5rem',
        'background-color':'#f3f4f6', 
        'width': '98%' 
    });
    payment.setCvvStyle({ 
        'border': '1px solid #e5e7eb', 
        'height': '2.5rem',
        'background-color':'#f3f4f6', 
        'width': '98%' 
    });
    payment.numberOn('input', function(data) {
        console.log('A number was entered');
    })
});

function interceptSubmit(e) {
var data = {
    card_holder: $('#card_holder').val(),
    month: $('#exp_month').val(),
    year: $('#exp_year').val(),
    email: $('#email').val()
};
payment.tokenize(
    data, //additional data, MUST include card_holder (or first_name & last_name), month and year
    function(token, cardData) { //success callback function
        $('#transaction_token').val(token); //store the transaction token
        // $('#payment_form').get(0).submit(); //submit the form
    }, 
    function(errors) { //error callback function
        alert('Errors occurred',errors);
        console.log(errors);
        //render error information here
    }
);
}