@if(session()->exists("success"))
    <div class="alert alert-success">
        <div class="container">{{ session("success") }}</div>
    </div>
@endif

@if(session()->exists("danger"))
        <div class="alert alert-danger">
        <div class="container">{{ session("danger") }}</div>
    </div>
@endif