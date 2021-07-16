using AutoMapper;
using Domain.Entities;
using Domain.ValueObjects;
using NUnit.Framework;
using Project.Application.Common.Mappings;
using Project.Application.FavoriteProjectItems.Queries.GetFavoriteProjectsItems;
using Project.Application.StopwatchItems.Queries.GetStopwatchItemsWithPagination;
using System;
using System.Runtime.Serialization;

namespace Project.Application.UnitTests.Common.Mappings
{
    public class MappingTests
    {
        private readonly IConfigurationProvider _configuration;
        private readonly IMapper _mapper;

        public MappingTests()
        {
            _configuration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });

            _mapper = _configuration.CreateMapper();
        }

        [Test]
        public void ShouldHaveValidConfiguration()
        {
            _configuration.AssertConfigurationIsValid();
        }
        
        [Test]
        [TestCase(typeof(ProjectItem), typeof(ProjectItems.Queries.GetProjectItem.ProjectItemDto))]
        [TestCase(typeof(ProjectItem), typeof(ProjectItems.Queries.GetProjectItemsWithPagination.ProjectItemDto))]
        [TestCase(typeof(ProjectItem), typeof(FavoriteProjectItemDto))]
        [TestCase(typeof(StopwatchItem), typeof(StopwatchItemDto))]
        public void ShouldSupportMappingFromSourceToDestination(Type source, Type destination)
        {
            var instance = GetInstanceOf(source);

            _mapper.Map(instance, source, destination);
        }

        private object GetInstanceOf(Type type)
        {
            if (type.GetConstructor(Type.EmptyTypes) != null)
                return Activator.CreateInstance(type);

            return FormatterServices.GetUninitializedObject(type);
        }
    }
}
