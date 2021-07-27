using Domain.Entities;
using MediatR;
using Project.Application.Common.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.AccountData.Commands.DeleteAccountData
{

    public class DeleteAccountDataCommand : IRequest
    {
        public class DeleteAccountDataCommandHandler : IRequestHandler<DeleteAccountDataCommand>
        {
            private readonly IContext _context;
            private readonly ICurrentUserService _currentUserService;


            public DeleteAccountDataCommandHandler(IContext context, ICurrentUserService currentUserService)
            {
                _context = context;
                _currentUserService = currentUserService;
            }

            public async Task<Unit> Handle(DeleteAccountDataCommand request, CancellationToken cancellationToken)
            {
                string userEmail = _currentUserService.UserEmail;

                IQueryable<ProjectItem> projects = _context.ProjectItems.Where(x => x.CreatedBy == userEmail);
                IQueryable<StopwatchItem> stopwatches = _context.StopWatchItems.Where(x => x.CreatedBy == userEmail);

                if (projects is not null)
                    _context.ProjectItems.RemoveRange(projects);

                if (stopwatches is not null)
                    _context.StopWatchItems.RemoveRange(stopwatches);

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }

}
