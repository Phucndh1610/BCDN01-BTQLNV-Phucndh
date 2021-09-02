function Validation() {
    //Phương thức
    //kiểm tra ô nhập liệu có bị trống hay không
    this.checkEmpty = function (inputval, spanID, message) {
        //trim: Xóa khoảng trắng trước và sau chuỗi
        // "   test   " => "test"
        // "       "=> ""
        if (inputval.trim() == "") {
            //Không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        } else {
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    }
    //kiểm tra mã trùng
    this.checkID = function (inputval, spanID, message, mang) {
        //Kiểm tra mã đã tồn tại trong mảng
        var isExist = false;
        // some => return giá trị true/false dựa vào biểu thức so sánh
        isExist = mang.some(function(item) {
            return item.taiKhoan === inputval.trim();
        });
        if (isExist) {
            //mã bị trùng => không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        } else {
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    }

    this.checkName=function(inputval, spanID, message){
        // RegExp: đối tượng giúp chuyển đổi từ string sang kiêu Regular expressions
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");
        if(pattern.test(inputval)){
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else{
            // không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        }

    }

    this.checkEmail = function(inputval, spanID, message){
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(inputval.match(pattern)){
              //hợp lệ
              document.getElementById(spanID).innerHTML = "";
              return true;
        }else{
            // không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    this.checkDropdown = function(selID,spanID, message){
        var optIndex = document.getElementById(selID).selectedIndex;
        // console.log(optIndex);
        if(optIndex != 0){
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else{
            // không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }    
    this.checkPass = function(inputval, spanID, message){
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
        if(inputval.match(pattern)){
             //hợp lệ
             document.getElementById(spanID).innerHTML = "";
             return true;
        }else{
             // không hợp lệ
             document.getElementById(spanID).innerHTML = message;
             return false;
        }
    }
    this.checkScore = function(inputval, spanID, message){
        var pattern =  /^(\d{1,2}(\.\d{1,2})?)$/;
        if(inputval.match(pattern)){
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
       }else{
            // không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
       }
    }
    this.checkDate = function(inputval, spanID, message){
        var pattern =  /^((0[1-9]|1[012]|[1-9])[- /.](0[1-9]|[12][0-9]|3[01]|[1-9])[- /.](19|20)\d\d|(19|20)\d\d[- /.](0[1-9]|1[012]|[1-9])[- /.](0[1-9]|[12][0-9]|3[01]|[1-9]))$/;
        if(inputval.match(pattern)){
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
       }else{
            // không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
       }
    }
    this.checkTime = function(inputval, spanID, message){
        var check = Number.isInteger(Number(inputval));
        var num = Number(inputval);
        if(check && num >= 80 && num <= 200){
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
       }else{
            // không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
       }
    }
    this.checkLuong = function(inputval, spanID, message){
        var check = Number.isInteger(Number(inputval));
        var num = Number(inputval);
        if (check && num >= 1000000 && num <= 20000000) {
            // hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            // không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }
}