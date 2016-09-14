new Vue({
  el: "#app",
  data: {
    details: false,
    student: {
      grade: "",
      returning: true,
    },
    students: [],
    grades: [
      { text: "K3 - K4", display: "K3 - K4", value: 0},
      { text: "K5", display: "K5", value: 1},
      { text: "Elementary (1st - 5th)", display: "Elementary", value: 2},
      { text: "Junior High (6th - 8th)", display: "Junior High", value: 3},
      { text: "High School (9th - 12th)", display: "High School", value: 4}
    ],
    k_tuition: 5800,
    hs_tuition: [
      5300,
      4980,
      4570,
      0
    ],
    registration: {
      returning: 200,
      new: 275,
    },
    comprehensive: [
      225,
      250,
      275,
      300,
    ]
  },
  methods: {
    add: function() {
      if(this.student.grade == "") {return false;}

      var price = {
          tuition: this.student.grade > 0 ? this.getDiscountedTuition() : this.k_tuition,
          registration: this.student.returning ? this.registration['returning'] : this.registration['new'],
          building: this.students.length == 0 ? 250 : 0,
          comprehensive: this.getComprehensive(this.student.grade),  
      };

      this.students.push({
        grade: this.grades[this.student.grade],
        returning: this.student.returning,
        price: price,  
        subtotal: this.subTotal(price),
      });
      
      // this.student.grade = "";
    },

    subTotal: function(prices) {
      var arr = Object.keys(prices).map(function (key) {return prices[key]});
      return arr.reduce(function (carry, price) {
        return carry + price;
      }, 0);
    },

    getDiscountedTuition: function() {
        const numOfStudentsThatQualify = this.students.reduce(function (carry, student) {
            return carry + (student.grade.value > 0 ? 1 : 0);
          }, 0);

        return this.hs_tuition[numOfStudentsThatQualify % 4];
    },

    getComprehensive: function(grade) {
      if (grade != 0) {
        grade--;
      }
      return this.comprehensive[grade];
    },

    toggleDetails: function() {
      this.details = ! this.details;
    },
  },
  computed: {
    total: function() {
      return this.students.reduce(function (carry, student) {
            return carry + student.subtotal;
          }, 0);
    },
  }
});

// Tuition for each grade level across the board
// factor in multi student discounts based on number of students in K5 - 12th

// Building fee of $250 regardless

// Registration fee per student based on if new or returning

// Comprehensive fee based on grade level