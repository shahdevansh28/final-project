﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using movie_ticket_booking.Models;

#nullable disable

namespace movie_ticket_booking.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20231229112007_DatabaseV1.1")]
    partial class DatabaseV11
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("movie_ticket_booking.Models.Booking", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<DateTime>("BookingDate")
                        .HasColumnType("datetime2");

                    b.Property<long?>("SeatId")
                        .HasColumnType("bigint");

                    b.Property<long>("ShowTimeId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("SeatId");

                    b.HasIndex("ShowTimeId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("movie_ticket_booking.Models.Movie", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<int>("Duration")
                        .HasColumnType("int");

                    b.Property<DateTime>("Release_Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Movies");
                });

            modelBuilder.Entity("movie_ticket_booking.Models.Seat", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<bool>("IsAvailable")
                        .HasColumnType("bit");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<int>("Row")
                        .HasColumnType("int");

                    b.Property<long>("ShowTimeId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("ShowTimeId");

                    b.ToTable("Seats");
                });

            modelBuilder.Entity("movie_ticket_booking.Models.ShowTime", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("datetime2");

                    b.Property<long>("MovieId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("datetime2");

                    b.Property<long>("TheaterId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("MovieId");

                    b.HasIndex("TheaterId");

                    b.ToTable("ShowTimes");
                });

            modelBuilder.Entity("movie_ticket_booking.Models.Theater", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<int>("Capacity")
                        .HasColumnType("int");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Theaters");
                });

            modelBuilder.Entity("movie_ticket_booking.Models.Booking", b =>
                {
                    b.HasOne("movie_ticket_booking.Models.Seat", "Seat")
                        .WithMany()
                        .HasForeignKey("SeatId");

                    b.HasOne("movie_ticket_booking.Models.ShowTime", "ShowTime")
                        .WithMany()
                        .HasForeignKey("ShowTimeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Seat");

                    b.Navigation("ShowTime");
                });

            modelBuilder.Entity("movie_ticket_booking.Models.Seat", b =>
                {
                    b.HasOne("movie_ticket_booking.Models.ShowTime", "ShowTime")
                        .WithMany()
                        .HasForeignKey("ShowTimeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ShowTime");
                });

            modelBuilder.Entity("movie_ticket_booking.Models.ShowTime", b =>
                {
                    b.HasOne("movie_ticket_booking.Models.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("movie_ticket_booking.Models.Theater", "Theater")
                        .WithMany()
                        .HasForeignKey("TheaterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Movie");

                    b.Navigation("Theater");
                });
#pragma warning restore 612, 618
        }
    }
}
