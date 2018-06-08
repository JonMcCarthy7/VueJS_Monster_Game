new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    sp: 3
  },
  methods: {
    startGame: function() {
      (this.gameIsRunning = true),
        (this.playerHealth = 100),
        (this.monsterHealth = 100);
    },

    attack: function() {
      this.monsterHealth -= this.calculateDamage(3, 10);
      if (this.checkWin()) return;

      this.monsterAttacks();
    },

    specialAttack: function() {
      let vm = this;
      if (vm.sp > 0) {
        this.monsterHealth -= this.calculateDamage(10, 20);
        if (this.checkWin()) return;

        this.monsterAttacks();
        vm.sp -= 1;
      } else {
        alert("You are out of special Attacks!");
      }
    },

    heal: function() {},
    giveUp: function() {},

    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },

    monsterAttacks: function() {
      this.playerHealth -= this.calculateDamage(5, 12);
      this.checkWin();
    },

    checkWin: function() {
      if (this.monsterHealth <= 0) {
        confirm("You have defeated the Monster! Play again?")
          ? this.startGame()
          : (this.gameIsRunning = false);
        this.sp = 3;
        return true;
      } else if (this.playerHealth <= 0) {
        confirm("You have been defeated... Play again?")
          ? this.startGame()
          : (this.gameIsRunning = false);
        this.sp = 3;
        return true;
      }
      return false;
    }
  }
});
