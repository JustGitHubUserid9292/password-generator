export default function rememberPsw(psw) {
    const words = [
      "apple", "banana", "cat", "dog", "elephant", "fish", "grape", "house", "ice", "jungle",
      "kangaroo", "lemon", "mountain", "notebook", "orange", "penguin", "queen", "rabbit",
      "strawberry", "tiger", "umbrella", "violin", "watermelon", "xylophone", "yogurt", "zebra"
    ];
    
    return psw.split('').map(elm => {
      const match = words.find(word => word[0].toLowerCase() === elm.toLowerCase());
  
      if (match) {
        return elm === elm.toUpperCase() ? match.toUpperCase() : match;
      }
  
      return elm;
    }).join(' ');
}
  