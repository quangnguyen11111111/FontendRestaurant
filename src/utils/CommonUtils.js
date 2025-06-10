class CommonUtils {
    static getBase64(file) {
        return new Promise((resolve, reject) => { 
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            
            reader.onload = () => {
                const buffer = reader.result;
                const byteArray = new Uint8Array(buffer);
                
                // Chuyển dữ liệu nhị phân thành chuỗi hex
                const hexString = Array.from(byteArray)
                    .map(byte => byte.toString(16).padStart(2, '0'))
                    .join('');
                    
                resolve(hexString); // Trả về chuỗi hex
            };
            
            reader.onerror = error => reject(error);  // Xử lý lỗi
        });
    }
}


export default CommonUtils;
