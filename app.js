new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    sp: 3,
    heals: 3,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
      this.sp = 3;
      this.heals = 3;
    },

    attack: function() {
      let damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster for ${damage}`
      });
      if (this.checkWin()) return;

      this.monsterAttacks();
    },

    specialAttack: function() {
      let vm = this;
      let damage = this.calculateDamage(10, 20);
      if (vm.sp > 0) {
        vm.turns.unshift({
          isPlayer: true,
          text: `Player hits Monster with special attack for ${damage}`
        });
        vm.monsterHealth -= damage;
        if (vm.checkWin()) return;

        vm.monsterAttacks();
        vm.sp -= 1;
      } else {
        alert("You are out of special Attacks!");
      }
    },

    heal: function() {
      let vm = this;
      if (vm.heals > 0) {
        vm.playerHealth <= 90
          ? (vm.playerHealth += 10)
          : (vm.playerHealth = 100);
        vm.turns.unshift({
          isPlayer: true,
          text: `Player uses healing potion for 10`
        });

        vm.monsterAttacks();
        vm.heals -= 1;
      } else {
        alert("You are out of healing potions!");
      }
    },
    giveUp: function() {
      this.gameIsRunning = false;
      this.sp = 3;
      this.heals = 3;
    },

    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },

    monsterAttacks: function() {
      let damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits Player for ${damage}`
      });
      this.checkWin();
    },

    checkWin: function() {
      if (this.monsterHealth <= 0) {
        confirm("You have defeated the Monster! Play again?")
          ? this.startGame()
          : (this.gameIsRunning = false);

        return true;
      } else if (this.playerHealth <= 0) {
        confirm("You have been defeated... Play again?")
          ? this.startGame()
          : (this.gameIsRunning = false);
        return true;
      }
      return false;
    }
  }
});
