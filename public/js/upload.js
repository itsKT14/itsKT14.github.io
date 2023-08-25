const testFunc = async () => {
    console.log("start");
    const upload_opts = document.getElementsByName('upload');
    let upload = "";
    for (i = 0; i < upload_opts.length; i++) {
        if (upload_opts[i].checked){
            upload = upload_opts[i].value
        }
    }
    const img = document.getElementById("formFile");
    let file = img.files[0];
    if(upload == "opt1"){
        file = document.getElementById("formText").value;
    }
    const category = document.getElementById("category").value;
    const tag = document.getElementById("tag").value;
    const title = document.getElementById("title").value;
    const condition_opts = document.getElementsByName('condition');
    let condition = "";
    for (i = 0; i < condition_opts.length; i++) {
        if (condition_opts[i].checked){
            condition = condition_opts[i].value
        }
    }
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const brand = document.getElementById("brand").value;
    const isMoreThanOne_El = document.getElementById("isMoreThanOne");
    let isMoreThanOne = "";
    if (isMoreThanOne_El.checked == true){
        isMoreThanOne = "true";
    }else{
        isMoreThanOne = "false";
    }
    const allowSms_El = document.getElementById("allowSms");
    let allowSms = "";
    if (allowSms_El.checked == true){
        allowSms = "true";
    }else{
        allowSms = "false";
    }
    const meetupInfo = document.getElementById("meetupInfo").value;
    const deliverInfo = document.getElementById("deliverInfo").value;


    const data = new FormData();
    data.append('upload', upload);
    data.append('image_file', file);
    data.append('category', category);
    data.append('tag', tag);
    data.append('title', title);
    data.append('condition', condition);
    data.append('price', price);
    data.append('description', description);
    data.append('brand', brand);
    data.append('isMoreThanOne', isMoreThanOne);
    data.append('allowSms', allowSms);
    data.append('meetupInfo', meetupInfo);
    data.append('deliverInfo', deliverInfo);

    try {
        const response = await fetch("/user/sell", {
            method: "POST",
            body: data,
        });
        window.location.replace(response.url);
    
    } catch (error) {
        console.error("Error:", error);
    }
}