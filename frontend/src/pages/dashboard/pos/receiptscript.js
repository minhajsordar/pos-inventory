
async function exportReport(dataList, exportType, printOptions = {}) {
    console.log("Exporting:", dataList, exportType);
  
    const {
      printerType = 'standard', // Options: 'standard', 'mini-pos', 'pdf'
      orientation = 'portrait', // Default for PDF; Mini POS usually has fixed orientation
      format = 'a4', // Default for PDF; change to '58mm' or '80mm' for mini POS
      title = 'পেমেন্ট রিসিপ্ট',
      fontSize = 10,
      unit = 'mm',
    } = printOptions;
  
    let doc;
    let pageWidth, startY;
  
    // Configure PDF based on printer type
    if (printerType === 'mini-pos') {
      // Mini POS printer (typically 58mm or 80mm width)
      pageWidth = format === '80mm' ? 80 : 58;
      doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [pageWidth, 297] });
      startY = 10;
      doc.setFontSize(12); // Slightly larger for receipt readability on mini printers
    } else {
      // Standard Printer or PDF (A4 or Letter)
      doc = new jsPDF({ orientation, unit, format });
      pageWidth = doc.internal.pageSize.getWidth();
      startY = 20;
      doc.setFontSize(18);
    }
  
    // Load and add logo at the top center of the page
    console.log(base64LogoImage.value)
    if (base64LogoImage.value) {
      const logoBase64 = base64LogoImage.value;
      const logoWidth = 30; // Width of the logo in mm
      const logoHeight = 10; // Height of the logo in mm
      const logoX = (pageWidth - logoWidth) / 2; // Centered horizontally
      doc.addImage(logoBase64, 'PNG', logoX, 10, logoWidth, logoHeight);
  
      // Adjust startY position after the logo
      startY += logoHeight + 10;
    }
  
    // Add title below the logo
    doc.text(title, pageWidth / 2, startY, { align: 'center' });
    doc.setFontSize(fontSize);
  
    // Prepare table data
    const body = dataList.products.map(item => [
      item.name,
      `${item.price} x ${item.quantity} = ${item.price * item.quantity}`
    ]);
  
    // Configure product table styles based on printer type
    autoTable(doc, {
      willDrawPage: function (data) {
        // Header
        doc.setFontSize(20)
        doc.setTextColor(40)
        // if (base64Img) {
        //   doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10)
        // }
        doc.text('Report', data.settings.margin.left + 15, 22)
      },
      body: body,
      styles: { fontSize, cellPadding: 1 },
      startY: startY + 10,
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'right' }
      },
      theme: printerType === 'mini-pos' ? 'plain' : 'grid', // Minimalist for mini-pos
      didDrawPage: printerType === 'mini-pos' ? adjustForMiniPos : null,
      margin: {
        left: 5,
        right: 5
      }
    });
  
    // Prepare summary table data
    const summaryBody = [
      ["Sub Total", dataList.products.reduce((a, c) => c.price * c.quantity + a, 0)],
      ["Discount", dataList.discount],
      ["Grand Total", dataList.totalAmount],
      ["Customer Paid Amount", dataList.paidAmount],
    ];
  
    autoTable(doc, {
      body: summaryBody,
      styles: { fontSize, cellPadding: 1 },
      startY: doc.previousAutoTable.finalY + 10, // Position summary table below product table
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'right' }
      },
      theme: printerType === 'mini-pos' ? 'plain' : 'grid',
      didDrawPage: printerType === 'mini-pos' ? adjustForMiniPos : null,
      margin: {
        left: 5,
        right: 5
      }
    });
  
    // Adjust page for mini POS printer
    function adjustForMiniPos(data) {
      const { doc, cursor } = data;
      doc.setDrawColor(0);
      doc.line(5, cursor.y + 2, pageWidth - 5, cursor.y + 2); // Footer line
    }
  
    // Export based on exportType
  
    const pdfFrame = document.getElementById('pdfFrame');
    receiptDialog.value = true;
    if (exportType === 'download') {
      doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
    } else if (exportType === 'print') {
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const newWindow = window.open(pdfUrl);
      newWindow.onload = () => {
        newWindow.print();
        URL.revokeObjectURL(pdfUrl);
      };
    } else if (exportType === 'receipt') {
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      pdfFrame.src = pdfUrl;
      // Optionally, add a print button to print the PDF
      document.getElementById('printButton').onclick = () => {
        pdfFrame.contentWindow.print();
      };
  
      // Clean up the object URL when it's no longer needed
      pdfFrame.onload = () => {
        URL.revokeObjectURL(pdfUrl);
      };
      // const receiptWindow = window.open(pdfUrl, 'Receipt', `width=${pageWidth + 20},height=600`);
      // receiptWindow.onload = () => {
      //   receiptWindow.print();
      //   URL.revokeObjectURL(pdfUrl);
      // };
    } else {
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
    }
  }