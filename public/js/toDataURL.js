 const imgData = canvas.toDataURL("image/jpeg", 1.0);

   const pdf = new jsPDF({
       orientation: "portrait", // landscape or portrait
       unit: "mm",
       format: "a4",
   });
   const imgProps = pdf.getImageProperties(imgData);
   const margin = 0.1;

   const pdfWidth = pdf.internal.pageSize.width * (1 - margin);
   const pdfHeight = pdf.internal.pageSize.height * (1 - margin);

   const x = pdf.internal.pageSize.width * (margin / 2);
   const y = pdf.internal.pageSize.height * (margin / 2);

   const widthRatio = pdfWidth / imgProps.width;
   const heightRatio = pdfHeight / imgProps.height;
   const ratio = Math.min(widthRatio, heightRatio);
   
   const w = imgProps.width * ratio;
   const h = imgProps.height * ratio;

   pdf.addImage(imgData, "JPEG", x, y, w, h);