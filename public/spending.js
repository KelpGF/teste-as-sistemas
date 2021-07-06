const baseUrlSpending = "api/spending";

function getSpending(url, filter = false) 
{
    if (filter) {
        $(".spending_card").hide();
    } else {
        $(".spending_card").show();
    }

    $.get(url, function(retorno) {
        $(`.spending_category`).html("");
        
        retorno.map((spent) => {
            $(`#spending_card_${spent.category_fk}`).show();

            let closing_date = new Date(spent.closing_date);

            date = (closing_date.getDate() < 10) ? '0'+closing_date.getDate() : closing_date.getDate();
            date += '/'+((closing_date.getMonth() < 10) ? '0'+closing_date.getMonth() : closing_date.getMonth());
            date += '/'+closing_date.getFullYear();

            $(`#spending_category_${spent.category_fk}`).append(`
                <li class="list-group-item" id="spent_${spent.id}_li">
                    <div class="row">
                        <div class="col-8">
                            <button class="btn btn-danger btn-sm" onClick="removeSpent(${spent.id})"
                                title="Deletar Gasto">
                                <i class="fas fa-times"></i>
                            </button>
                            <strong>
                                `
                                +(Number(spent.total_spent)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })+
                                `
                            </strong>
                            <span> 
                                ${(spent.description === null) ? "" : " - "+spent.description} 
                            </span>
                        </div>
                        <div class="col-4 text-right">
                            <i class="fas fa-calendar"></i> ${date}
                        </div>
                    </div>
                </li>
            `);
        });
    });
}

function spendingByFilters()
{
    const category_select = $('#category_select').val();
    const period_select = $('#period_select').val();

    let url = baseUrlSpending;
    let filter = true;
    
    if (category_select != '0' && period_select != '') {
        url += `/allFilters/${category_select}/${period_select}`;
    } else if (category_select != '0') {
        url += `/byCategory/${category_select}`;
    } else if (period_select != '') {
        url += `/byPeriod/${period_select}`;
    } else {
        filter = false;
    }

    getSpending(url, filter);
};

function spentAdd(category_id, category_title)
{
    $("#category_title_add").text(category_title);
    $("#btn-spendingAdd").val(category_id)
}

$("#category_select,#period_select").change(function() {
    spendingByFilters();
});

$("#btn-spendingAdd").click(function() {
    const data = {
        category_fk: $("#btn-spendingAdd").val(),
        description: $("#spendDescription").val(),
        total_spent: $("#spendTotal").val(),
        closing_date: $("#spendDate").val(),
    }

    $.ajax({
        url: baseUrlSpending,
        method: 'POST',
        data
    }) 
    .done(function() {
        $('#spentAdd').modal("hide");
        spendingByFilters();
    });
});


function removeSpent(spent_id)
{
    $.ajax({
        url: baseUrlSpending+'/'+spent_id,
        method: 'DELETE',
    }) 
    .done(function() {
        $(`#spent_${spent_id}_li`).fadeOut("slow");

        setTimeout(() => {
            $(`#spent_${spent_id}_li`).remove();
        }, 1000);
    });
}