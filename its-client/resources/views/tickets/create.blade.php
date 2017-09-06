@extends("shared.layout")

@section("site-content")

@section("entry-header")
    <div class="entry-header">
        <div class="container">
            <h3 class="entry-title">Submit a new ticket</h3>
        </div>
    </div>
@endsection

<div id="CreateTicketArea">
    @include("errors.validation-errors")

    <form action="{{ url('tickets') }}" method="POST" class="form-horizontal" style="display:inline-block" novalidate="novalidate">
        {{ csrf_field() }}
        <input type="hidden" name="user_id" value="{{ Auth::user()->id }}" />

        <div class="form-group{{ $errors->has('details') ? ' has-error' : '' }}">
            <label for="TicketSubject" class="col-sm-2 control-label">Subject</label>
            <div class="col-sm-10">
                <input type="text" id="TicketSubject" name="subject" value="{{ old('subject', '') }}" class="form-control input-xs" required autofocus/>
                @if ($errors->has('subject'))
                    <span class="help-block">
                        <strong>{{ $errors->first('subject') }}</strong>
                    </span>
                @endif
            </div>
        </div>

        <div class="form-group{{ $errors->has('operating_system') ? ' has-error' : '' }}">
            <label for="TicketOperatingSystem" class="col-sm-2 control-label">Operating System</label>

            <div class="col-sm-10">
                <select name="operating_system" id="TicketOperatingSystem" class="form-control input-xs" >
                    <option value="-" selected="selected">-- Select OS --</option>
                    @foreach($operating_system as $item)
                        <option value="{{ $item }}"{{ old('operating_system') == $item ? " selected" : " " }}>{{ $item }}</option>
                    @endforeach
                </select>

                @if ($errors->has('operating_system'))
                    <span class="help-block">
                        <strong>{{ $errors->first('operating_system') }}</strong>
                    </span>
                @endif
            </div>
        </div>


        <div class="form-group{{ $errors->has('software_issue') ? ' has-error' : '' }}">
            <label for="TicketSoftwareIssue" class="col-sm-2 control-label">Software Issues</label>

            <div class="col-sm-10">
                <select name="software_issue" id="TicketSoftwareIssue" class="form-control input-xs" >
                    <option value="-" selected="selected">-- Select Common Issues --</option>
                    @foreach($software_issues as $item)
                        <option value="{{ $item }}"{{ old('software_issue') == $item ? " selected" : " " }}>{{ $item }}</option>
                    @endforeach
                </select>

                @if ($errors->has('software_issue'))
                    <span class="help-block">
                        <strong>{{ $errors->first('software_issue') }}</strong>
                    </span>
                @endif
            </div>
        </div>

        <div class="form-group{{ $errors->has('details') ? ' has-error' : '' }}">
            <label for="TicketComment" class="col-sm-2 control-label">Details</label>
            <div class="col-sm-10">
                <textarea name="details" 
                        class="form-control input-xs"  
                        id="TicketComment" 
                        rows="5" 
                        placeholder="Your ticket details" 
                        required="required" 
                        minlength="10">{{ old('details', '') }}</textarea>
                
                @if ($errors->has('details'))
                    <span class="help-block">
                        <strong>{{ $errors->first('details') }}</strong>
                    </span>
                @endif
            </div>
        </div>

        <div class="form-group">
            <div class="col-sm-10 col-sm-offset-2">
                <input type="submit" value="Submit ticket" class="btn btn-success">
            </div>
        </div>

    </form>
</div><!-- end #CreateTicketArea -->

@endsection

@section("head-scripts")
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.6.5/tinymce.min.js"></script>
    <script>
        tinymce.init({
            selector: '#CreateTicketArea textarea'
        });
    </script>

@endsection

@section("footer-scripts")
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js"></script>
    <script>
        $(document).ready(function(){
            $("form").validate();
        });
    </script>
@endsection