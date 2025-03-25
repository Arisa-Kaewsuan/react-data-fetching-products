// Step 1 : npm install axios มาแล้วต้แง import axios มาใช้งานด้วย
import axios from "axios";
// 3.1 import useEffect มาใช้ เพื่อที่ตอนแสดงผลเราจะไม่ต้องมา refresh หน้า
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Step 3 : สร้างตัวแปร useState เพื่อ map product data ที่ดึงมาไปแสดงผล(render)
  const [productData, setProductData] = useState([]);
  // จะเห็นว่ามีข้อมูล name,price,image,description ที่มีการเปลี่ยนแปลง = เราต้องมีตัวแปร state 4 ตัว
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loadingStatus, setLoadingStatus] = useState("idle");

  // 3.2 : ใช้ useEffect ช่วยในการ render productData ที่ดึงมาให้ไม่ต้องกด refresh
  useEffect(() => {
    getProductData();
  }, []) // ถ้าเขียนแบบไม่ใช้ setLoadingStatus ควรใส่ [productData] -- อันนี้ถามแชทจีมา ไม่รู้จริงมั้ย

  // Step 2 : เขียนฟังก์ชั่น ดึงข้อมูล(Read Data) Product จาก Server
  // มาเก็บในตัวแปรชื่อ response การดึงข้อมูลใช้เวลานาน จึงใช้ Async/Await + try-catch เพื่อเช็คว่าได้รับ response จริงมั้ย 
  // ใช้ไลบารี่ axios แทนคำสั่ง fetch เพราะ จะช่วยให้เราข้ามขั้นตอนแปลงค่า data เป็น json ได้
  // ดึงข้อมูลมาแสดงผล(render) หรือ อ่านข้อมูล จะใช้ HTTP method เป็น GET และ endpoint เป็น http://localhost:4001/products ดูจากตารางที่เขากำหนดมาให้
  // ดึงข้อมูลมาได้แล้ว ต้อง update ตัวแปร state ก่อนว่ามีข้อมูลใหม่เพิ่มเข้ามา ก่อนจะไปแสดงผล
  const getProductData = async () => {
    setLoadingStatus("loading");
    try{
      const response = await axios.get("http://localhost:4001/products");
      setLoadingStatus("completed");
      setProductData(response.data.data);
    }
    catch (error) {
      setLoadingStatus("failed");
      console.error("Error fetching product data", error)
    }
  };



  // Step 4 : เขียนฟังก์ชั่น ลบข้อมูล(Delete Data) ออกจากข้อมูลใน Server และ Client ที่แสดงผลก็ต้องลบด้วย
  // เริ่มจากประกาศฟังก์ชั่นใช้ asyn-await และ axios เหมือนเดิม โดย HTTP method เป็น DELETE และ endpoint เป็น url ตามตาราง ที่ต้องระบุ id เพื่อจะได้รู้ว่าลบตัวไหน
  // ฝั่ง client ที่แสดงผล เราจะใช้ข้อมูลจาก ตัวแปร state ที่ชื่อ productData มา filter แสดงผลเฉพาะตัวที่ไม่ถูกลบ
  // เสร็จแล้วก็เหมือนเดิมต้องเซ็ทตัวแปร state ให้เป็นค่าปัจจุบันที่ลบข้อมูลแล้ว
  // ใส่ try-catch เพราะ เขียนตามรูปที่แคปมาละลบไม่ได้ เลยไปถาม AI แชทจี แนะนำให้เขียนแบบนิ้ 
  const deleteProductData = async (id) => {
    try {
      // ลบข้อมูลออกจาก server
      await axios.delete(`http://localhost:4001/products/${id}`);
      
      // กรองข้อมูลใน state เพื่อลบสินค้าที่ถูกลบออก
      const newProductData = productData.filter((item) => item.id !== id);
      
      // อัพเดท state ด้วยข้อมูลใหม่
      setProductData(newProductData);
    } catch (error) {
      console.error("Error deleting product", error);
      // เพิ่ม error handling เช่น แสดง alert หรือ toast
      alert("ไม่สามารถลบสินค้าได้ กรุณาลองอีกครั้ง");
    }
  }




  //========================================================================================================================================//
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {/* 3.3 จาก UI จะเห็นว่าเราอยากให้แสดงผลซ้ำๆ ในโค้ด ตั้งแต่บรรทัด 25-43 */}
      {/* เราจึงจะเอา productData ที่ดึงมา มา map แสดงผลตรงนี้  */}
      {productData.map((item) => {
        return (
          // การ map ต้องระบุ key เป็น unique เสมอๆ จากเนื้อหาเรื่อง Rendering List
          <div className="product-list" key={item.id}>
            <div className="product">
              <div className="product-preview">
                <img
                  // เอาข้อมูลจาก productData ที่ดึงมาแสดงผลรูปภาพ 
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                {/* เอาข้อมูลจาก productData ที่ดึงมาแสดงผล ชื่อ */}
                <h1>Product name: {item.name}</h1>
                {/* เอาข้อมูลจาก productData ที่ดึงมาแสดงผล ราคา */}
                <h2>Product price: {item.price}</h2>
                {/* เอาข้อมูลจาก productData ที่ดึงมาแสดงผล คำอธิบายสินค้า */}
                <p>Product description: {item.description}</p>
              </div>

              {/* 4.1 ต้องมาเซ็ท event ว่าเมื่อกดปุ่ม x เพื่อลบ จะไปทำฟังก์ชั่น deleteProductData */}
              {/* อย่าลืมว่าถ้าใส่ parameter ใน onclick ต้องเป็น callback function */}
              <button className="delete-button" onClick={() => deleteProductData(item.id)}>x</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
