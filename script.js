
let todo = document.querySelector('.todo')
let todoList = document.querySelector('#todoList');
let newItem = document.querySelector('#newItem');



let banco = [
    {'tarefa' : 'estudar JS' , 'situacao': ''},
    {'tarefa' : 'estudar php' , 'situacao': 'checked'}
];

const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList',JSON.stringify(banco));



const criarItem = (tarefa , situacao='', indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML=
     `<input type="checkbox" ${situacao} data-indice =${indice}>
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice =${indice}>`

    document.getElementById('todoList').appendChild(item)
}

const limparTarefa = () =>{
     const todoLista = todoList 
     while(todoLista.firstChild){
        todoLista.removeChild(todoLista.lastChild)
     }

}


const atualizarTela = () => { 
    limparTarefa()
    const banco = getBanco();
    banco.forEach((item , indice) => criarItem (item.tarefa,item.situacao ,indice));
    
}

const inserirItem = (evento) => {
    const tecla = evento.key ;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const banco = getBanco();
        banco.push({'tarefa' : texto  , 'situacao': ''}) 
         setBanco(banco);
         atualizarTela()
         evento.target.value = ''; /*Limpar a caixa de texto apos add uma tarefa*/
        
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice (indice,1) ;
    setBanco(banco);
    atualizarTela();
}
const Atualizar = (indice) => {
    const banco = getBanco();
    banco[indice].situacao = banco[indice].situacao === '' ? 'checked' : '' ;       // '?' = ENTÃO  ':' = SENÃO
    setBanco(banco);
     atualizarTela();
     if(banco === 'checked'){
         banco.style.backgroundColor = 'red'
     }
}

const clickItem = (evento) => {
  const elemento = evento.target ; 
   if(elemento.type === "button"){
     const indice = elemento.dataset.indice ;
     removerItem(indice) ;
   } else if (elemento.type === 'checkbox') {
    const indice = elemento.dataset.indice;
      Atualizar(indice)
   }
}

document.getElementById('todoList').addEventListener('click', clickItem);

newItem.addEventListener('keypress', inserirItem);

atualizarTela();