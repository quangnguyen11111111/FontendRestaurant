import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import * as actions from "../../../store/actions";
import "../../HomePage/style/testimonials.scss";
import "../../HomePage/style/HomeHeader.scss";
import { dispatch } from "../../../redux";

// Đăng ký các thành phần Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

class ListManage extends Component {
    constructor(props){
        super(props)
        this.state={
            Total:[],
            TotalOrder:"",
            TotalCategory:[],
            TotalTime:[],
            dataTime:``,
            year:"",
            month:"",
            day:"",
            categories:[],
            status:"năm"
        }
    }
    loadData=()=>{
        let {dataTime}=this.state
        this.props.fetchTotalStart(dataTime)
        this.props.fetchTotalOrderStart(dataTime)
        this.props.fetchTotalCategoryStart(dataTime)
        this.props.fetchTotalTimeStart(dataTime)
    }
    componentDidMount() {
        this.loadData()
        this.props.fetchCategoriesStart(1)
    }
    componentDidUpdate(prevProps) {
    
        if (prevProps.Total !== this.props.Total) {
          
            this.setState({
                Total: this.props.Total
            });
        }
        if (prevProps.TotalOrder !== this.props.TotalOrder) {
          
            this.setState({
                TotalOrder: this.props.TotalOrder
            });
        }
        if (prevProps.TotalCategory !== this.props.TotalCategory) {
          
            this.setState({
                TotalCategory: this.props.TotalCategory
            });
        }
        if (prevProps.TotalTime !== this.props.TotalTime) {
          
            this.setState({
                TotalTime: this.props.TotalTime
            });
        }
        if (prevProps.categories !== this.props.categories) {
          
            this.setState({
                categories: this.props.categories
            });
        }
    
        
        
    }
    handleOnChangeInput = async (event, id) => {
      let value = event.target.value; // Giá trị hiện tại từ input
      let copyState = { ...this.state };
      let { year, month, day } = copyState;
    
      // Validate năm, tháng, ngày
      if (id === "year") {
        if (!/^\d{0,4}$/.test(value)) {
          alert("Năm chỉ được phép là số dương gồm tối đa 4 chữ số!");
          return;
        }
      }
    
      if (id === "month") {
        if (!/^\d{0,2}$/.test(value) || parseInt(value, 10) > 12 || parseInt(value, 10) < 0) {
          alert("Tháng chỉ được phép là số từ 01 đến 12!");
          return;
        }
      }
    
      if (id === "day") {
        if (!/^\d{0,2}$/.test(value)) {
          alert("Ngày chỉ được phép là số dương!");
          return;
        }
        if (month && year) {
          const maxDays = this.getDaysInMonth(parseInt(month, 10), parseInt(year, 10));
          if (parseInt(value, 10) > maxDays) {
            alert(`Tháng ${month}/${year} chỉ có tối đa ${maxDays} ngày!`);
            return;
          }
        }
      }
    
      // Cập nhật state sau khi validate
      copyState[id] = value;
      this.setState({
        ...copyState,
      });
    
      // Xử lý các logic liên quan đến dataTime và trạng thái
      if (id === "year") {
        if (!month && !day && value !== "") {
          this.setState({
            dataTime: value,
            status: "năm",
          });
        } else if (month && !day) {
          this.setState({
            dataTime: `${month}/${value}`,
            status: "tháng",
          });
        } else if (month && day) {
          this.setState({
            dataTime: `${day}/${month}/${value}`,
            status: "ngày",
          });
        }
      }
    
      if (id === "month") {
        if (year && !day && value !== "") {
          this.setState({
            dataTime: `${value}/${year}`,
            status: "tháng",
          });
        } else if (year && day && value !== "") {
          this.setState({
            dataTime: `${day}/${value}/${year}`,
            status: "ngày",
          });
        } else if (!year) {
          this.setState({
            month: "",
          });
          alert("Vui lòng nhập năm trước khi chọn tháng!");
        }
      }
    
      if (id === "day") {
        if (year && month && value !== "") {
          this.setState({
            dataTime: `${value}/${month}/${year}`,
            status: "ngày",
          });
        } else if (!year || !month) {
          this.setState({
            day: "",
          });
          alert("Vui lòng nhập năm và tháng trước khi chọn ngày!");
        }
      }
    
      // Kiểm tra khi người dùng xóa giá trị
      if (value === "") {
        if (id === "month" && day) {
          alert("Không thể xóa tháng khi đã có ngày!");
          this.setState({
            month,
          });
        } else if (id === "year" && (month || day)) {
          alert("Không thể xóa năm khi đã có tháng hoặc ngày!");
          this.setState({
            year,
          });
        } else if (id === "day" && month && year) {
          this.setState({
            dataTime: `${month}/${year}`,
            status: "tháng",
            day: "",
          });
        } else if (id === "month" && year) {
          this.setState({
            dataTime: year,
            status: "năm",
            month: "",
          });
        }
      }
    };
    
    // Hàm hỗ trợ tính số ngày tối đa trong tháng
    getDaysInMonth = (month, year) => {
      const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (month === 2 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) {
        return 29;
      }
      return daysInMonth[month - 1];
    };
    
    
       generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
      search = () => {
        let { dataTime, year, month, day, status } = this.state;
      
        if (year === "" && month === "" && day === "") {
          alert("Hãy nhập ngày, tháng hoặc năm cụ thể!");
          return;
        }
      
        // Kiểm tra độ dài của `dataTime` theo `status`
        if (status === "năm" && dataTime.length !== 4) {
          alert("Vui lòng nhập năm hợp lệ (4 ký tự)!");
          return;
        }
      
        if (status === "tháng" && dataTime.length !== 7) {
          alert("Vui lòng nhập tháng hợp lệ theo định dạng mm/yyyy (6 ký tự)!");
          return;
        }
      
        if (status === "ngày" && dataTime.length !== 10) {
          alert("Vui lòng nhập ngày hợp lệ theo định dạng dd/mm/yyyy (10 ký tự)!");
          return;
        }
      
        // Nếu tất cả đều hợp lệ, gọi hàm loadData
        this.loadData();
      };
      
  render() {
    // Hàm tạo màu ngẫu nhiên

  
  let { Total, TotalOrder, TotalCategory, TotalTime, categories,month,day,year,status } = this.state;
  console.log("check", Total, TotalOrder, TotalCategory, TotalTime, categories);
  
  // Tính tổng của totalCount từ TotalCategory
  const totalSum = TotalCategory.reduce((sum, item) => sum + item.totalCount, 0);
  
  // Tạo mảng phần trăm cho từng category
  const categoryPercentages = categories.map((category) => {
    const matchingCategory = TotalCategory.find((item) => item.CatID === category.CatID);
    return matchingCategory
      ? ((matchingCategory.totalCount / totalSum) * 100).toFixed(2) // Tính % và làm tròn đến 2 chữ số thập phân
      : 0; // Nếu không có trong TotalCategory, % là 0
  });
  
  // Tạo mảng tên danh mục sản phẩm
  const category = categories.map((item) => item.CatName || "Không xác định");
  let Time = TotalTime.map((item) => item.OrderMonth || "Không xác định");
  
  const TotalSUM = TotalTime.map((item) => item.totalRevenue || "Không xác định");
  
  // Tạo mảng màu ngẫu nhiên
  const categoryColors = categories.map(() => this.generateRandomColor());
  
  // Data cho Pie Chart
  const categoryData = {
    labels: category,
    datasets: [
      {
        label: "Danh mục sản phẩm",
        data: categoryPercentages, // Sử dụng dữ liệu phần trăm
        backgroundColor: categoryColors, // Sử dụng mảng màu ngẫu nhiên
        borderWidth: 1,
      },
    ],
  };
  
  const categoryOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };
  
    // Data cho Line Chart
    const revenueData = {
      labels: Time,
      datasets: [
        {
          label: "Doanh thu (VNĐ)",
          data: TotalSUM,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        },
      ],
    };

    const revenueOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    };


    let TotalDT=0
    let TotalTDG=0
    return (
      <React.Fragment>
       {
        Total.map((item)=>{
            TotalDT+=item.OderAllPrice
            TotalTDG+=1
        })
       }
        <div className="dashboard">
            <h2>Thống kế theo {status}</h2>
            <div className="StatusDate">
                Ngày <input type="number" value={day} onChange={(event) =>
                      this.handleOnChangeInput(event, "day")
                    } />
                Tháng <input type="number" value={month} onChange={(event) =>
                    this.handleOnChangeInput(event, "month")
                  } />
                Năm <input type="number" value={year} onChange={(event) =>
                    this.handleOnChangeInput(event, "year")
                  }/>
                 <span onClick={this.search}>Tìm kiếm</span>
            </div>
          {/* Cards */}
          <div className="row">
            <div className="col-md-3">
              <div className="card text-white bg-primary mb-3">
                <div className="card-body">
                  <h5 className="card-title">Tổng Doanh Thu</h5>
                  <p className="card-text">{TotalDT} VNĐ</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-success mb-3">
                <div className="card-body">
                  <h5 className="card-title">Đơn Hàng</h5>
                  <p className="card-text">{TotalOrder} Đơn</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-warning mb-3">
                <div className="card-body">
                  <h5 className="card-title">Đơn hàng đã giao</h5>
                  <p className="card-text">{TotalTDG} Đơn</p>
                </div>
              </div>
            </div>
          </div>

          {/* Biểu đồ */}
          <div className="row center">
            <div className="col-md-6">
              <Line data={revenueData} options={revenueOptions} />
              <h5>Biểu đồ doanh thu</h5>
            </div>
            <div className="col-md-4">
              <Pie data={categoryData} options={categoryOptions} />
              <h3>Biểu đồ tỷ lệ loại sản phẩm đã bán</h3>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Total:state.admin.Total,
    TotalOrder:state.admin.TotalOrder,
    TotalCategory:state.admin.TotalCategory,
    TotalTime:state.admin.TotalTime,
    categories:state.food.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTotalStart:(data)=>dispatch(actions.fetchTotalStart(data)),
    fetchTotalOrderStart:(data)=>dispatch(actions.fetchTotalOrderStart(data)),
    fetchTotalCategoryStart:(data)=>dispatch(actions.fetchTotalCategoryStart(data)),
    fetchTotalTimeStart:(data)=>dispatch(actions.fetchTotalTimeStart(data)),
    fetchCategoriesStart:(data)=>dispatch(actions.fetchCategoriesStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListManage));
