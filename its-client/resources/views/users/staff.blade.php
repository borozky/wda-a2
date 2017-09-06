@extends("shared.layout")

@section("title", "Enter staff email - ITS Ticketing System")

@section("site-content")
    <div id="StaffEntryArea">

        @include("errors.validation-errors")
        <br/>

        <form action="{{ url('/staff') }}" method="POST">
            {{ csrf_field() }}
            <table>
                <tr>
                    <td><label for="StaffEmail">Staff Email</label></td>
                    <td>
                        <input type="email" name="staff_email" id="StaffEmail" class="form-control input-xs">
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input type="submit" value="View All Tickets" class="btn btn-sm btn-primary">
                    </td>
                </tr>
            </table>
        </form>
    </div>
@endsection

