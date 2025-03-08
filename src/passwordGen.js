function validatePassword(psw, config) {
    if (config.alphabetLower && !/[a-z]/.test(psw)) return false
    
    if (config.alphabetUpper && !/[A-Z]/.test(psw)) return false
    
    if (config.numbers && !/\d/.test(psw)) return false
    
    if (config.symbols && !/[!@#$%^&*()_+=-]/.test(psw)) return false
  
    return true;
}
  
  
export default function passwordGen(config) {
    let psw = ''
    let set = ''
    const alphabetLower = 'abcdefghijklmnopqrstuvwxyz'
    const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '01234567890'
    const symbols = '!@#$%^&*()<>{},._+=-'
  
    if (config.alphabetLower) set += alphabetLower
    if (config.alphabetUpper) set += alphabetUpper
    if (config.numbers) set += numbers
    if (config.symbols) set += symbols

    if (!config.alphabetLower && !config.alphabetUpper && !config.numbers && !config.symbols) return ''
  
    for (let i = config.length; i > 0; i -= 1) {
      psw += set[Math.floor(Math.random() * set.length)]
    }
    
    return psw.length > 3 ? validatePassword(psw, config) ? psw : passwordGen(config) : psw
}