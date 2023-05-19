
(function () {
    var check = function () {
        let equal = $("#password-check").val() == $("#password").val() && $("#password-check").val() !== "" && $("#username").val() !== "" && $("#currentPassword").val() !== "";
        $("#password-check-icon").attr('class', equal ? "fa fa-lock text-success" : "fa fa-unlock-alt text-danger");
        $("#password-check-msg").text(equal ? "OK" : "Mismatch").attr("class", "input-group-text text-" + (equal ? "success" : "danger"));
        $("#btn-submit").prop("disabled", !equal);
        if (!equal) {
            $("#btn-submit").css("cursor", "not-allowed");
        } else $("#btn-submit").css("cursor", "pointer");
    };

    function fail() {
        $("input,button").prop("disabled", false);
        swal({
            type: 'error',
            title: 'Oops...',
            html: "Couldn't change user's password. <br />Contact your System Administrator."
        })
    }

    $("#btn-submit").click(function () {
        $.ajax({
            url: "api/set_password",
            type: "POST",
            data: JSON.stringify({ "username": $("#username").val(), "oldpassword": $("#currentPassword").val(), "newpassword": $("#password-check").val() }),
            contentType: "application/json; charset=UTF-8",
            processData: false,
            dataType: "json"
        }).done(function (data) {
            if (data && typeof data === "object" &&
                data.hasOwnProperty("status") && data["status"] == "OK") {
                $("#username,#password,#password-check,#currentPassword").val("").prop("disabled", false);
                $("#btn-submit").prop("disabled", true);
                swal({
                    type: 'success',
                    title: 'Done',
                    text: "User's password changed!"
                });
            } else {
                fail();
            }
        }).fail(function (data) {
            fail();
        });
    });

    $("#password").on("keypress keyup keydown change", function () {
        var color = "", index = 0, msg = "";

        var pass = $(this).val();
        if (pass) {
            var score = zxcvbn(pass).score;

            if (score == 0) { color = "text-danger"; index = 0; msg = "Very weak"; }
            else if (score > 0 && score <= 1) { color = "text-warning"; index = 1; msg = "Weak"; }
            else if (score > 1 && score <= 2) { color = "text-info"; index = 2; msg = "Fair"; }
            else if (score > 2 && score <= 3) { color = "text-primary"; index = 3; msg = "Good"; }
            else if (score > 3) { color = "text-success"; index = 4; msg = "Strong"; }
            else { color = ""; index = 0; msg = ""; }
        }

        $("#password-icon").attr('class', "fa fa-thermometer-" + index + " " + color);
        $("#password-msg").text(msg).attr("class", "input-group-text " + color);
        check();
    });
    $("#password-check").on("keypress keyup keydown change", check);

    $("#password-icon").attr('class', "fa fa-thermometer-0 text-danger");
    $("#password-msg").text("").attr("class", "input-group-text text-danger");
    $("#password-check-icon").attr('class', "fa fa-lock text-success");
    $("#password-check-msg").attr("class", "input-group-text text-success").text("OK");

    check();
    $("#username").focus();
})();
