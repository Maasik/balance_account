/*
=====================================================
 ������ ������������
-----------------------------------------------------
 evgeny.tc@gmail.com
-----------------------------------------------------
 ������ ��� ������� ���������� �������
=====================================================
*/

/* �������� �������� */
function load_page_pay(page, pagin, effect) {

    /* ���������������� ������ ����, ���� ��� �� ����� ������� ��� �������� ������� */
    //effect = false;

    if( page ) {
        $.get(dle_root + "engine/modules/balance_account/user/load_control.php?pagin="+pagin, { page: page }, function (data) {
            var getdata = data.split('<SPLIT>');
  
            if(effect!=undefined) {
              $( "#payb_main" ).html( getdata[1] );
              $( "#payb_navigation" ).html( getdata[0] );
            } else {
                $( "#payb_main" ).slideUp("slow", function() {
                  $( "#payb_main" ).html( getdata[1] ).slideDown( "slow" );
                  $( "#payb_navigation" ).html( getdata[0] );
                })
            }
        })
    }
    return false;
};
/* ������� ������� */
function kgba_tran() {

    load_page_pay('tran', $( "#tran_user" ).val() + "&unit=" + $( "#tran_unit" ).val() + "&code=" + $( "#tran_captcha" ).val(), false);
    
    return false;
};
/* ����� �������, paging */
function kgba_mb() {

    load_page_pay('moneyback', "ins&money=" + $( "#mb_money" ).val() + "&info=" + $( "#mb_info" ).val() + "&code=" + $( "#mb_captcha" ).val(), false);
    
    return false;
};
/* ����� �������, ������ */
function kgba_delmb(id) {

    load_page_pay('moneyback', "delmb&id=" + id, false);
    
    return false
}
/* ���������� ������� */
function kgba_select_payment(step, paysys) {

    if (step == "end") var unit =  $( "#pay_unit" ).val() + "&code=" + $( "#pay_captcha" ).val();
   
    load_page_pay("pay_next_step", "payment=&step=" + step + "&paysys=" + paysys + "&unit=" + unit);
    
    return false
}
/* ������� ���� */
function removeBill(bill_id) {

      $.get(dle_root + "engine/modules/balance_account/user/load_control.php?page=paybill", { remove: bill_id }, function (data) {
          $("#winBill").remove();
          load_page_pay('bills', 1, false);
      })

}
/* ���� ��� ������ */
function showBill(bill_id) {

      $.get(dle_root + "engine/modules/balance_account/user/load_control.php?page=paybill", { key: bill_id }, function (data) {
          showPopupBill( data );
      })

}
/* ���� ������ ����� */
function showPopupBill( info ) {

  $("#winBill").html( info );

      $("#winBill").dialog({
          autoOpen: true,
          show: 'slide',
          hide: 'slide',
      });

}