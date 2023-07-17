const { createApp } = Vue
 createApp({
   data() {
     return {
       url: 'https://ntaux.pythonanywhere.com/productos',
       productos: [],
       cantidad:0
     }
   },
   methods: {
     fetchData(url) { 
      console.log(12+"-"+this.url)
       fetch(url)
         .then(response => response.json())
         .then(data => {
           console.log(data)
           this.productos=data.map( x => {x.cantidad=""; return x})
        })
         .catch(error=>alert("Ups... se produjo un error: "+ error))
     },
     comprar(item){
      let producto = {
        nombre:item.nombre,
        precio: item.precio,
        stock: item.stock-item.cantidad ,
        imagen: item.imagen
      }
    var options = {
        body: JSON.stringify(producto),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    }
    //url=this.url+'/'+item.id
    console.log(39+"-"+this.url)
    fetch(this.url+'/'+item.id, options)
        .then(function () {
            alert("Registro modificado")
            location.reload();
        })
        .catch(err => {
            console.error(err);
            alert("Error al Modificar")
        })  


      }
    },
   
   created() {
     this.fetchData(this.url)                                                      
   }
 
 }).mount('#app')


