const nums = [1, 2, 4, 8, 9, 10, 11, 12, 13, 15, 17];
const alvo = 28;

function pares(nums, alvo){
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === alvo) {
                return [i, j];
        }
    }
}
}
const resultado = pares(nums, alvo);

console.table(resultado)

